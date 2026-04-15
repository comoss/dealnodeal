define(["require", "exports", "./GameComponents/board", "./GameComponents/playerView", "./GameCreationComponents/createGameForm"], function (require, exports, board_1, playerView, createGameForm_1) {
    "use strict";
    var main = /** @class */ (function () {
        function main() {
        }
        main.run = function () {
            var boardsContainer = document.getElementById("boardsContainer");
            var isPlayerView = new URLSearchParams(window.location.search).get('view') === 'player';
            if (isPlayerView) {
                // Hide setup form, mark header as player view
                var appEl = document.getElementById("app");
                if (appEl)
                    appEl.style.display = "none";
                var subtitle = document.querySelector('.game-subtitle');
                if (subtitle) {
                    subtitle.innerHTML = '<span class="player-view-badge">Player View</span>';
                }
                new playerView(boardsContainer);
                return;
            }
            // Host view — normal game setup
            var form = new createGameForm_1.createGameForm();
            form.mainContainer.appendto(document.getElementById("app"));
            // Add "Open Player View" link to the setup form area
            var pvLink = document.createElement('a');
            pvLink.href = '?view=player';
            pvLink.target = '_blank';
            pvLink.className = 'player-view-link';
            pvLink.textContent = 'Open Player View \u2197';
            document.getElementById("app").appendChild(pvLink);
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