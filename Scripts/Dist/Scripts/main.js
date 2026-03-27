define(["require", "exports", "./GameComponents/board", "./GameCreationComponents/createGameForm"], function (require, exports, board_1, createGameForm_1) {
    "use strict";
    var main = /** @class */ (function () {
        function main() {
        }
        main.run = function () {
            var form = new createGameForm_1.createGameForm();
            form.mainContainer.appendto(document.getElementById("app"));
            var boardsContainer = document.getElementById("boardsContainer");
            // Restore saved game state if available
            var savedState = board_1.board.loadState();
            if (savedState) {
                var fakeInputGroups = savedState.cases.map(function (c) { return ({
                    text: { value: function () { return c.label; } },
                    value: { value: function () { return String(c.value); } }
                }); });
                var b = new board_1.board(savedState.name, fakeInputGroups);
                b.populateValues(boardsContainer);
                b.restoreState(savedState);
            }
            document.getElementById("newGame").addEventListener("click", function () {
                board_1.board.clearState();
                boardsContainer.innerHTML = '';
                var name = document.getElementById("gameName").value.trim() || "Player";
                var b = new board_1.board(name, form.inputGroups);
                b.populateValues(boardsContainer);
            });
        };
        return main;
    }());
    return main;
});
//# sourceMappingURL=main.js.map