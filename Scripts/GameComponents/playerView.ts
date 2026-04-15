import { formatStrings } from "./../Utils/formatStrings";

interface CaseState {
    label: string;
    value: number;
    status: boolean; // true = unopened, false = opened
}

interface BoardState {
    name: string;
    cases: CaseState[];
    currentOfferValue: number;
    roundIndex: number;
    casesOpenedThisRound: number;
    waitingForDeal: boolean;
    gameOver: boolean;
    dealTaken: boolean;
}

class playerView {
    private static STORAGE_KEY = 'dealnodeal_state';
    private static ROUNDS = [6, 5, 4, 3, 2, 1, 1, 1, 1];
    private container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;
        this.render();
        window.addEventListener('storage', (e: StorageEvent) => {
            if (e.key === playerView.STORAGE_KEY) {
                this.render();
            }
        });
    }

    render(): void {
        const state = playerView.loadState();

        if (!state) {
            this.container.innerHTML = `
                <div class="waiting-panel">
                    <div class="waiting-icon">&#128188;</div>
                    <div class="waiting-title">Waiting for Game</div>
                    <div class="waiting-message">The host will start the game shortly&hellip;</div>
                </div>
            `;
            return;
        }

        const casesHtml = state.cases.map(c => {
            if (!c.status) {
                return `<div class="btn btn-case btn-case-opened">
                    <span class="case-label">${c.label}</span>
                    <span class="case-reveal-value">${formatStrings.currency(c.value)}</span>
                </div>`;
            } else {
                return `<div class="btn btn-case">
                    <span class="case-number">${c.label}</span>
                </div>`;
            }
        }).join('');

        const sorted = state.cases.slice().sort((a, b) => a.value - b.value);
        const valuesBoardHtml = sorted.map(c =>
            `<span class="value-chip ${c.status ? 'value-active' : 'value-gone'}">${formatStrings.currency(c.value)}</span>`
        ).join('');

        let topSectionHtml = '';

        if (state.gameOver) {
            if (state.dealTaken) {
                topSectionHtml = `
                    <div class="offer-container">
                        <div class="game-over-panel deal-taken">
                            <div class="game-over-icon">&#129309;</div>
                            <div class="game-over-title">DEAL!</div>
                            <div class="game-over-amount">${formatStrings.currency(state.currentOfferValue)}</div>
                            <div class="game-over-name">Congratulations, ${state.name}!</div>
                        </div>
                    </div>
                `;
            } else {
                const lastCase = state.cases.find(c => c.status);
                const finalValue = lastCase ? lastCase.value : 0;
                topSectionHtml = `
                    <div class="offer-container">
                        <div class="game-over-panel no-deal-end">
                            <div class="game-over-icon">&#127881;</div>
                            <div class="game-over-title">YOU WIN!</div>
                            <div class="game-over-amount">${formatStrings.currency(finalValue)}</div>
                            <div class="game-over-name">${state.name} kept their case!</div>
                        </div>
                    </div>
                `;
            }
        } else if (state.waitingForDeal) {
            const activeCases = state.cases.filter(c => c.status).length;
            topSectionHtml = `
                <div class="offer-container">
                    <div class="banker-call">
                        <div class="banker-title">&#9742; THE BANKER</div>
                        <div class="banker-message">${activeCases} cases remaining</div>
                        <div class="offer-label">BANKER'S OFFER</div>
                        <div class="offer-amount">${formatStrings.currency(state.currentOfferValue)}</div>
                    </div>
                    <div class="deal-pending">Decision pending&hellip;</div>
                </div>
            `;
        }

        let roundInfoHtml = '';
        if (!state.gameOver && !state.waitingForDeal) {
            const casesNeeded = playerView.ROUNDS[state.roundIndex] || 1;
            const remaining = casesNeeded - state.casesOpenedThisRound;
            roundInfoHtml = `
                <div class="round-info">
                    <span class="round-label">Round ${state.roundIndex + 1}</span>
                    &mdash; Open <span class="cases-to-open">${remaining}</span> more cases
                </div>
            `;
        }

        this.container.innerHTML = `
            <div class="board-container">
                <div class="player-header">
                    <h3 class="player-name">${state.name || 'Player'}</h3>
                </div>
                ${roundInfoHtml}
                ${topSectionHtml}
                <div class="cases-grid">${casesHtml}</div>
                <div class="values-board">${valuesBoardHtml}</div>
            </div>
        `;
    }

    private static loadState(): BoardState | null {
        const stored = localStorage.getItem(playerView.STORAGE_KEY);
        if (!stored) return null;
        try {
            return JSON.parse(stored) as BoardState;
        } catch (e) {
            return null;
        }
    }
}

export = playerView;
