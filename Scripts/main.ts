import { board } from "./GameComponents/board";
import { showDivButton } from "./GameCreationComponents/showDivButton";
import { createGameForm } from "./GameCreationComponents/createGameForm";

class main {
    public static run() {
        const form = new createGameForm(); 
        form.mainContainer.appendto(document.getElementById("app"));

        const boardsContainer = document.getElementById("boardsContainer");


        // new showDivButton(document.getElementById("boardsContainer"))
        document.getElementById("newGame").addEventListener("click", () => {
            const name = (<HTMLInputElement>document.getElementById("gameName")).value.trim();
            const b = new board(name, form.inputGroups);
            b.populateValues(boardsContainer);
        });
    }
}

export = main; 
