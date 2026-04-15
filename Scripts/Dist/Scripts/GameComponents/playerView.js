define(["require", "exports", "./../Utils/formatStrings"], function (require, exports, formatStrings_1) {
    "use strict";
    var playerView = /** @class */ (function () {
        function playerView(container) {
            var _this = this;
            this.container = container;
            this.render();
            window.addEventListener('storage', function (e) {
                if (e.key === playerView.STORAGE_KEY) {
                    _this.render();
                }
            });
        }
        playerView.prototype.render = function () {
            var state = playerView.loadState();
            if (!state) {
                this.container.innerHTML = "\n                <div class=\"waiting-panel\">\n                    <div class=\"waiting-icon\">&#128188;</div>\n                    <div class=\"waiting-title\">Waiting for Game</div>\n                    <div class=\"waiting-message\">The host will start the game shortly&hellip;</div>\n                </div>\n            ";
                return;
            }
            var casesHtml = state.cases.map(function (c) {
                if (!c.status) {
                    return "<div class=\"btn btn-case btn-case-opened\">\n                    <span class=\"case-label\">".concat(c.label, "</span>\n                    <span class=\"case-reveal-value\">").concat(formatStrings_1.formatStrings.currency(c.value), "</span>\n                </div>");
                }
                else {
                    return "<div class=\"btn btn-case\">\n                    <span class=\"case-number\">".concat(c.label, "</span>\n                </div>");
                }
            }).join('');
            var sorted = state.cases.slice().sort(function (a, b) { return a.value - b.value; });
            var valuesBoardHtml = sorted.map(function (c) {
                return "<span class=\"value-chip ".concat(c.status ? 'value-active' : 'value-gone', "\">").concat(formatStrings_1.formatStrings.currency(c.value), "</span>");
            }).join('');
            var topSectionHtml = '';
            if (state.gameOver) {
                if (state.dealTaken) {
                    topSectionHtml = "\n                    <div class=\"offer-container\">\n                        <div class=\"game-over-panel deal-taken\">\n                            <div class=\"game-over-icon\">&#129309;</div>\n                            <div class=\"game-over-title\">DEAL!</div>\n                            <div class=\"game-over-amount\">".concat(formatStrings_1.formatStrings.currency(state.currentOfferValue), "</div>\n                            <div class=\"game-over-name\">Congratulations, ").concat(state.name, "!</div>\n                        </div>\n                    </div>\n                ");
                }
                else {
                    var lastCase = state.cases.find(function (c) { return c.status; });
                    var finalValue = lastCase ? lastCase.value : 0;
                    topSectionHtml = "\n                    <div class=\"offer-container\">\n                        <div class=\"game-over-panel no-deal-end\">\n                            <div class=\"game-over-icon\">&#127881;</div>\n                            <div class=\"game-over-title\">YOU WIN!</div>\n                            <div class=\"game-over-amount\">".concat(formatStrings_1.formatStrings.currency(finalValue), "</div>\n                            <div class=\"game-over-name\">").concat(state.name, " kept their case!</div>\n                        </div>\n                    </div>\n                ");
                }
            }
            else if (state.waitingForDeal) {
                var activeCases = state.cases.filter(function (c) { return c.status; }).length;
                topSectionHtml = "\n                <div class=\"offer-container\">\n                    <div class=\"banker-call\">\n                        <div class=\"banker-title\">&#9742; THE BANKER</div>\n                        <div class=\"banker-message\">".concat(activeCases, " cases remaining</div>\n                        <div class=\"offer-label\">BANKER'S OFFER</div>\n                        <div class=\"offer-amount\">").concat(formatStrings_1.formatStrings.currency(state.currentOfferValue), "</div>\n                    </div>\n                    <div class=\"deal-pending\">Decision pending&hellip;</div>\n                </div>\n            ");
            }
            var roundInfoHtml = '';
            if (!state.gameOver && !state.waitingForDeal) {
                var casesNeeded = playerView.ROUNDS[state.roundIndex] || 1;
                var remaining = casesNeeded - state.casesOpenedThisRound;
                roundInfoHtml = "\n                <div class=\"round-info\">\n                    <span class=\"round-label\">Round ".concat(state.roundIndex + 1, "</span>\n                    &mdash; Open <span class=\"cases-to-open\">").concat(remaining, "</span> more cases\n                </div>\n            ");
            }
            this.container.innerHTML = "\n            <div class=\"board-container\">\n                <div class=\"player-header\">\n                    <h3 class=\"player-name\">".concat(state.name || 'Player', "</h3>\n                </div>\n                ").concat(roundInfoHtml, "\n                ").concat(topSectionHtml, "\n                <div class=\"cases-grid\">").concat(casesHtml, "</div>\n                <div class=\"values-board\">").concat(valuesBoardHtml, "</div>\n            </div>\n        ");
        };
        playerView.loadState = function () {
            var stored = localStorage.getItem(playerView.STORAGE_KEY);
            if (!stored)
                return null;
            try {
                return JSON.parse(stored);
            }
            catch (e) {
                return null;
            }
        };
        playerView.STORAGE_KEY = 'dealnodeal_state';
        playerView.ROUNDS = [6, 5, 4, 3, 2, 1, 1, 1, 1];
        return playerView;
    }());
    return playerView;
});
//# sourceMappingURL=playerView.js.map