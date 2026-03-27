import { board } from "./GameComponents/board";
import { showDivButton } from "./GameCreationComponents/showDivButton";
import { createGameForm } from "./GameCreationComponents/createGameForm";

class main {
    public static run() {
        const form = new createGameForm();
        form.mainContainer.appendto(document.getElementById("app"));

        const boardsContainer = document.getElementById("boardsContainer");

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
