import { formatStrings } from "./../Utils/formatStrings";
import { briefcase } from "./briefcase";
import {inputGroup } from '../GameCreationComponents/inputGroup';

interface CaseState {
    label: string;
    value: number;
    status: boolean;
}

interface BoardState {
    name: string;
    cases: CaseState[];
    currentOffer: string;
}

export class board {
    name: string;
    dollarAmounts: inputGroup[];
    cases: briefcase[];
    boardContainer: HTMLDivElement;
    currentOffer: HTMLParagraphElement;

    private static STORAGE_KEY = 'dealnodeal_state';

    constructor(name, briefcaseValues: inputGroup[]) {
        this.name = name;

        this.boardContainer = document.createElement("div");
        this.boardContainer.className = "col-xs-12";

        this.dollarAmounts = briefcaseValues;

        this.cases = [];

        this.currentOffer = document.createElement("p");
        this.currentOffer.className = "text-xs-center text-success font-weight-bold";
        this.currentOffer.innerText = "$0";
    }

    populateValues(displayDiv) {
        this.boardContainer.insertAdjacentHTML("AfterBegin", `<h4 class="text-xs-center">${this.name}</h4>`);
        for (let c of this.dollarAmounts) {
            const Briefcase = new briefcase(c);
            Briefcase.button.addEventListener("click", () => {
                if (Briefcase.status === true) {
                    Briefcase.status = false;
                    Briefcase.button.className = "btn btn-danger"
                } else {
                    Briefcase.status = true;
                    Briefcase.button.className = "btn btn-primary"
                }

                this.currentOffer.innerText = formatStrings.currency(this.calculateOffer());
                this.saveState();
            })
            this.cases.push(Briefcase);
            this.boardContainer.appendChild(Briefcase.button);
            this.boardContainer.appendChild(this.currentOffer);
        }

        displayDiv.appendChild(this.boardContainer)
    }

    calculateOffer(): number {
        let AmountActive: number = 0;
        let median: number = 0;

        for (let c of this.cases) {
            if (c.status === true) {
                AmountActive++
                if (AmountActive === 26) {
                    median = 0;
                } else {
                    median = median + c.value;
                }
            }
        }

        return median / AmountActive;
    }

    saveState(): void {
        const state: BoardState = {
            name: this.name,
            cases: this.cases.map(c => ({
                label: c.button.innerText,
                value: c.value,
                status: c.status
            })),
            currentOffer: this.currentOffer.innerText
        };
        localStorage.setItem(board.STORAGE_KEY, JSON.stringify(state));
    }

    restoreState(savedCases: CaseState[], savedOffer: string): void {
        for (let i = 0; i < this.cases.length && i < savedCases.length; i++) {
            this.cases[i].status = savedCases[i].status;
            this.cases[i].button.className = savedCases[i].status ? "btn btn-primary" : "btn btn-danger";
        }
        this.currentOffer.innerText = savedOffer;
    }

    static loadState(): BoardState | null {
        const stored = localStorage.getItem(board.STORAGE_KEY);
        if (!stored) return null;
        try {
            return JSON.parse(stored) as BoardState;
        } catch (e) {
            return null;
        }
    }

    static clearState(): void {
        localStorage.removeItem(board.STORAGE_KEY);
    }
}