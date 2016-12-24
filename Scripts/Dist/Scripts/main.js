define(["require", "exports", "./GameComponents/board", "./GameCreationComponents/createGameForm"], function (require, exports, board_1, createGameForm_1) {
    "use strict";
    var main = (function () {
        function main() {
        }
        main.run = function () {
            var form = new createGameForm_1.createGameForm();
            form.mainContainer.appendto(document.getElementById("app"));
            var boardsContainer = document.getElementById("boardsContainer");
            // new showDivButton(document.getElementById("boardsContainer"))
            document.getElementById("newGame").addEventListener("click", function () {
                var name = document.getElementById("gameName").value.trim();
                var b = new board_1.board(name, form.inputGroups);
                b.populateValues(boardsContainer);
            });
        };
        return main;
    }());
    return main;
});
//# sourceMappingURL=main.js.map