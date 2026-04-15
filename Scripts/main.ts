import { board } from "./GameComponents/board";
import playerView = require("./GameComponents/playerView");
import { showDivButton } from "./GameCreationComponents/showDivButton";
import { createGameForm } from "./GameCreationComponents/createGameForm";

class main {
    public static run() {
        const boardsContainer = document.getElementById("boardsContainer");
        const isPlayerView = new URLSearchParams(window.location.search).get('view') === 'player';

        if (isPlayerView) {
            // Hide setup form, mark header as player view
            const appEl = document.getElementById("app");
            if (appEl) appEl.style.display = "none";

            const subtitle = document.querySelector('.game-subtitle') as HTMLElement;
            if (subtitle) {
                subtitle.innerHTML = '<span class="player-view-badge">Player View</span>';
            }

            new playerView(boardsContainer);
            return;
        }

        // Host view — normal game setup
        const form = new createGameForm();
        form.mainContainer.appendto(document.getElementById("app"));

        // Add "Open Player View" link to the setup form area
        const pvLink = document.createElement('a');
        pvLink.href = '?view=player';
        pvLink.target = '_blank';
        pvLink.className = 'player-view-link';
        pvLink.textContent = 'Open Player View \u2197';
        document.getElementById("app").appendChild(pvLink);

        // Restore saved game state if available
        const savedState = board.loadState();
        if (savedState) {
            const fakeInputGroups = savedState.cases.map(c => ({
                text: { value: () => c.label },
                value: { value: () => String(c.value) }
            })) as any;

            const b = new board(savedState.name, fakeInputGroups);
            b.populateValues(boardsContainer);
            b.restoreState(savedState);
        }

        document.getElementById("newGame").addEventListener("click", () => {
            board.clearState();
            boardsContainer.innerHTML = '';
            const name = (<HTMLInputElement>document.getElementById("gameName")).value.trim() || "Player";
            const b = new board(name, form.inputGroups);
            b.populateValues(boardsContainer);
        });
    }
}

export = main;
