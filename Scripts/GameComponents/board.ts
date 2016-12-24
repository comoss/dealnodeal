import { formatStrings } from "./../Utils/formatStrings";
import { briefcase } from "./briefcase";
import {inputGroup } from '../GameCreationComponents/inputGroup';

export class board {
    name: string;
    dollarAmounts: inputGroup[];
    cases: briefcase[];
    boardContainer: HTMLDivElement;
    currentOffer: HTMLParagraphElement; 

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
}