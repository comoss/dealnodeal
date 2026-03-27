import { formatStrings } from "./../Utils/formatStrings";
import { briefcase } from "./briefcase";
import { inputGroup } from '../GameCreationComponents/inputGroup';

interface CaseState {
    label: string;
    value: number;
    status: boolean;
}

interface BoardState {
    name: string;
    cases: CaseState[];
    currentOfferValue: number;
    roundIndex: number;
    casesOpenedThisRound: number;
    waitingForDeal: boolean;
    gameOver: boolean;
}

export class board {
    name: string;
    dollarAmounts: inputGroup[];
    cases: briefcase[];
    boardContainer: HTMLDivElement;
    currentOffer: HTMLParagraphElement;

    private roundIndex: number = 0;
    private casesOpenedThisRound: number = 0;
    private waitingForDeal: boolean = false;
    private gameOver: boolean = false;
    private lastOfferValue: number = 0;

    private roundInfoEl: HTMLDivElement;
    private offerContainer: HTMLDivElement;
    private valuesBoardEl: HTMLDivElement;

    private static STORAGE_KEY = 'dealnodeal_state';
    private static ROUNDS = [6, 5, 4, 3, 2, 1, 1, 1, 1];

    constructor(name: string, briefcaseValues: inputGroup[]) {
        this.name = name;

        this.boardContainer = document.createElement("div");
        this.boardContainer.className = "board-container";

        this.dollarAmounts = briefcaseValues;
        this.cases = [];

        this.currentOffer = document.createElement("p");
        this.currentOffer.className = "current-offer-text";
        this.currentOffer.innerText = "";
    }

    populateValues(displayDiv: HTMLElement): void {
        this.boardContainer.innerHTML = `
            <div class="player-header">
                <h3 class="player-name">${this.name || 'Player'}</h3>
            </div>
            <div class="round-info">
                <span class="round-label">Round 1</span>
                &mdash; Open <span class="cases-to-open">6</span> more cases
            </div>
        `;

        this.roundInfoEl = this.boardContainer.querySelector('.round-info') as HTMLDivElement;

        this.offerContainer = document.createElement("div");
        this.offerContainer.className = "offer-container";
        this.offerContainer.style.display = "none";
        this.boardContainer.appendChild(this.offerContainer);

        this.boardContainer.appendChild(this.currentOffer);

        const casesGrid = document.createElement("div");
        casesGrid.className = "cases-grid";
        for (let c of this.dollarAmounts) {
            const bc = new briefcase(c);
            bc.button.addEventListener("click", () => this.openCase(bc));
            this.cases.push(bc);
            casesGrid.appendChild(bc.button);
        }
        this.boardContainer.appendChild(casesGrid);

        this.valuesBoardEl = document.createElement("div");
        this.valuesBoardEl.className = "values-board";
        this.updateValuesBoard();
        this.boardContainer.appendChild(this.valuesBoardEl);

        displayDiv.appendChild(this.boardContainer);
    }

    private openCase(bc: briefcase): void {
        if (!bc.status || this.waitingForDeal || this.gameOver) return;

        bc.status = false;
        bc.button.className = "btn btn-case btn-case-opened";
        bc.button.innerHTML = `<span class="case-label">${bc.label}</span><span class="case-reveal-value">${formatStrings.currency(bc.value)}</span>`;

        this.casesOpenedThisRound++;
        this.updateValuesBoard();
        this.saveState();

        const casesNeeded = board.ROUNDS[this.roundIndex] || 1;
        const remaining = casesNeeded - this.casesOpenedThisRound;

        if (remaining <= 0) {
            this.endRound();
        } else {
            this.updateRoundInfo(remaining);
        }
    }

    private endRound(): void {
        const activeCases = this.cases.filter(c => c.status);
        if (activeCases.length <= 1) {
            this.endGame();
            return;
        }

        this.waitingForDeal = true;
        this.lastOfferValue = this.calculateOffer();
        this.showBankerOffer(this.lastOfferValue);
        this.saveState();
    }

    private showBankerOffer(offer: number): void {
        const activeCases = this.cases.filter(c => c.status).length;
        this.offerContainer.innerHTML = `
            <div class="banker-call">
                <div class="banker-title">&#9742; THE BANKER</div>
                <div class="banker-message">${activeCases} cases remaining</div>
                <div class="offer-label">BANKER'S OFFER</div>
                <div class="offer-amount">${formatStrings.currency(offer)}</div>
            </div>
            <div class="deal-buttons">
                <button class="btn-deal" id="btn-deal-yes">DEAL!</button>
                <button class="btn-no-deal" id="btn-deal-no">NO DEAL!</button>
            </div>
        `;
        this.offerContainer.style.display = "block";

        const btnDeal = this.offerContainer.querySelector('#btn-deal-yes') as HTMLButtonElement;
        const btnNoDeal = this.offerContainer.querySelector('#btn-deal-no') as HTMLButtonElement;
        btnDeal.addEventListener("click", () => this.handleDeal(offer));
        btnNoDeal.addEventListener("click", () => this.handleNoDeal());
    }

    private handleDeal(offer: number): void {
        this.gameOver = true;
        this.offerContainer.innerHTML = `
            <div class="game-over-panel deal-taken">
                <div class="game-over-icon">&#129309;</div>
                <div class="game-over-title">DEAL!</div>
                <div class="game-over-amount">${formatStrings.currency(offer)}</div>
                <div class="game-over-name">Congratulations, ${this.name}!</div>
            </div>
        `;
        this.offerContainer.style.display = "block";
        if (this.roundInfoEl) this.roundInfoEl.style.display = "none";
        board.clearState();
    }

    private handleNoDeal(): void {
        this.waitingForDeal = false;
        this.casesOpenedThisRound = 0;
        this.roundIndex++;
        this.offerContainer.style.display = "none";

        const activeCases = this.cases.filter(c => c.status).length;
        if (activeCases <= 1) {
            this.endGame();
        } else {
            const casesNeeded = board.ROUNDS[this.roundIndex] || 1;
            const next = Math.min(casesNeeded, activeCases - 1);
            this.updateRoundInfo(next);
        }
        this.saveState();
    }

    private endGame(): void {
        this.gameOver = true;
        const lastCase = this.cases.find(c => c.status);
        const finalValue = lastCase ? lastCase.value : 0;

        if (lastCase) {
            lastCase.button.className = "btn btn-case btn-case-final";
            lastCase.button.innerHTML = `<span class="case-label">${lastCase.label}</span><span class="case-reveal-value">${formatStrings.currency(finalValue)}</span>`;
        }

        this.offerContainer.innerHTML = `
            <div class="game-over-panel no-deal-end">
                <div class="game-over-icon">&#127881;</div>
                <div class="game-over-title">YOU WIN!</div>
                <div class="game-over-amount">${formatStrings.currency(finalValue)}</div>
                <div class="game-over-name">${this.name} kept their case!</div>
            </div>
        `;
        this.offerContainer.style.display = "block";
        if (this.roundInfoEl) this.roundInfoEl.style.display = "none";
        board.clearState();
    }

    private updateRoundInfo(casesLeft: number): void {
        if (!this.roundInfoEl) return;
        const roundNum = this.roundIndex + 1;
        (this.roundInfoEl.querySelector('.round-label') as HTMLElement).innerText = `Round ${roundNum}`;
        (this.roundInfoEl.querySelector('.cases-to-open') as HTMLElement).innerText = String(casesLeft);
    }

    private updateValuesBoard(): void {
        if (!this.valuesBoardEl) return;
        const sorted = this.cases.slice().sort((a, b) => a.value - b.value);
        this.valuesBoardEl.innerHTML = sorted.map(c =>
            `<span class="value-chip ${c.status ? 'value-active' : 'value-gone'}">${formatStrings.currency(c.value)}</span>`
        ).join('');
    }

    calculateOffer(): number {
        const active = this.cases.filter(c => c.status);
        if (active.length === 0) return 0;
        const total = active.reduce((sum, c) => sum + c.value, 0);
        return Math.round(total / active.length);
    }

    saveState(): void {
        const state: BoardState = {
            name: this.name,
            cases: this.cases.map(c => ({
                label: c.label,
                value: c.value,
                status: c.status
            })),
            currentOfferValue: this.lastOfferValue,
            roundIndex: this.roundIndex,
            casesOpenedThisRound: this.casesOpenedThisRound,
            waitingForDeal: this.waitingForDeal,
            gameOver: this.gameOver
        };
        localStorage.setItem(board.STORAGE_KEY, JSON.stringify(state));
    }

    restoreState(savedState: BoardState): void {
        this.roundIndex = savedState.roundIndex || 0;
        this.casesOpenedThisRound = savedState.casesOpenedThisRound || 0;
        this.waitingForDeal = savedState.waitingForDeal || false;
        this.gameOver = savedState.gameOver || false;
        this.lastOfferValue = savedState.currentOfferValue || 0;

        for (let i = 0; i < this.cases.length && i < savedState.cases.length; i++) {
            const bc = this.cases[i];
            const saved = savedState.cases[i];
            bc.status = saved.status;
            if (!saved.status) {
                bc.button.className = "btn btn-case btn-case-opened";
                bc.button.innerHTML = `<span class="case-label">${bc.label}</span><span class="case-reveal-value">${formatStrings.currency(bc.value)}</span>`;
            }
        }

        this.updateValuesBoard();

        if (this.gameOver) {
            if (this.roundInfoEl) this.roundInfoEl.style.display = "none";
        } else if (this.waitingForDeal) {
            this.showBankerOffer(this.lastOfferValue);
        } else {
            const casesNeeded = board.ROUNDS[this.roundIndex] || 1;
            const remaining = casesNeeded - this.casesOpenedThisRound;
            this.updateRoundInfo(remaining);
        }
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
