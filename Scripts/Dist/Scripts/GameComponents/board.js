define(["require", "exports", "./../Utils/formatStrings", "./briefcase"], function (require, exports, formatStrings_1, briefcase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.board = void 0;
    var board = /** @class */ (function () {
        function board(name, briefcaseValues) {
            this.roundIndex = 0;
            this.casesOpenedThisRound = 0;
            this.waitingForDeal = false;
            this.gameOver = false;
            this.dealTaken = false;
            this.lastOfferValue = 0;
            this.name = name;
            this.boardContainer = document.createElement("div");
            this.boardContainer.className = "board-container";
            this.dollarAmounts = briefcaseValues;
            this.cases = [];
            this.currentOffer = document.createElement("p");
            this.currentOffer.className = "current-offer-text";
            this.currentOffer.innerText = "";
        }
        board.prototype.populateValues = function (displayDiv) {
            var _this = this;
            this.boardContainer.innerHTML = "\n            <div class=\"player-header\">\n                <h3 class=\"player-name\">".concat(this.name || 'Player', "</h3>\n            </div>\n            <div class=\"round-info\">\n                <span class=\"round-label\">Round 1</span>\n                &mdash; Open <span class=\"cases-to-open\">6</span> more cases\n            </div>\n        ");
            this.roundInfoEl = this.boardContainer.querySelector('.round-info');
            this.offerContainer = document.createElement("div");
            this.offerContainer.className = "offer-container";
            this.offerContainer.style.display = "none";
            this.boardContainer.appendChild(this.offerContainer);
            this.boardContainer.appendChild(this.currentOffer);
            var casesGrid = document.createElement("div");
            casesGrid.className = "cases-grid";
            var _loop_1 = function (c) {
                var bc = new briefcase_1.briefcase(c);
                bc.button.addEventListener("click", function () { return _this.openCase(bc); });
                this_1.cases.push(bc);
                casesGrid.appendChild(bc.button);
            };
            var this_1 = this;
            for (var _i = 0, _a = this.dollarAmounts; _i < _a.length; _i++) {
                var c = _a[_i];
                _loop_1(c);
            }
            this.boardContainer.appendChild(casesGrid);
            this.valuesBoardEl = document.createElement("div");
            this.valuesBoardEl.className = "values-board";
            this.updateValuesBoard();
            this.boardContainer.appendChild(this.valuesBoardEl);
            displayDiv.appendChild(this.boardContainer);
        };
        board.prototype.openCase = function (bc) {
            if (!bc.status || this.waitingForDeal || this.gameOver)
                return;
            bc.status = false;
            bc.button.className = "btn btn-case btn-case-opened";
            bc.button.innerHTML = "<span class=\"case-label\">".concat(bc.label, "</span><span class=\"case-reveal-value\">").concat(formatStrings_1.formatStrings.currency(bc.value), "</span>");
            this.casesOpenedThisRound++;
            this.updateValuesBoard();
            this.saveState();
            var casesNeeded = board.ROUNDS[this.roundIndex] || 1;
            var remaining = casesNeeded - this.casesOpenedThisRound;
            if (remaining <= 0) {
                this.endRound();
            }
            else {
                this.updateRoundInfo(remaining);
            }
        };
        board.prototype.endRound = function () {
            var activeCases = this.cases.filter(function (c) { return c.status; });
            if (activeCases.length <= 1) {
                this.endGame();
                return;
            }
            this.waitingForDeal = true;
            this.lastOfferValue = this.calculateOffer();
            this.showBankerOffer(this.lastOfferValue);
            this.saveState();
        };
        board.prototype.showBankerOffer = function (offer) {
            var _this = this;
            var activeCases = this.cases.filter(function (c) { return c.status; }).length;
            this.offerContainer.innerHTML = "\n            <div class=\"banker-call\">\n                <div class=\"banker-title\">&#9742; THE BANKER</div>\n                <div class=\"banker-message\">".concat(activeCases, " cases remaining</div>\n                <div class=\"offer-label\">BANKER'S OFFER</div>\n                <div class=\"offer-amount\">").concat(formatStrings_1.formatStrings.currency(offer), "</div>\n            </div>\n            <div class=\"deal-buttons\">\n                <button class=\"btn-deal\" id=\"btn-deal-yes\">DEAL!</button>\n                <button class=\"btn-no-deal\" id=\"btn-deal-no\">NO DEAL!</button>\n            </div>\n        ");
            this.offerContainer.style.display = "block";
            var btnDeal = this.offerContainer.querySelector('#btn-deal-yes');
            var btnNoDeal = this.offerContainer.querySelector('#btn-deal-no');
            btnDeal.addEventListener("click", function () { return _this.handleDeal(offer); });
            btnNoDeal.addEventListener("click", function () { return _this.handleNoDeal(); });
        };
        board.prototype.handleDeal = function (offer) {
            this.gameOver = true;
            this.dealTaken = true;
            this.offerContainer.innerHTML = "\n            <div class=\"game-over-panel deal-taken\">\n                <div class=\"game-over-icon\">&#129309;</div>\n                <div class=\"game-over-title\">DEAL!</div>\n                <div class=\"game-over-amount\">".concat(formatStrings_1.formatStrings.currency(offer), "</div>\n                <div class=\"game-over-name\">Congratulations, ").concat(this.name, "!</div>\n            </div>\n        ");
            this.offerContainer.style.display = "block";
            if (this.roundInfoEl)
                this.roundInfoEl.style.display = "none";
            this.saveState();
        };
        board.prototype.handleNoDeal = function () {
            this.waitingForDeal = false;
            this.casesOpenedThisRound = 0;
            this.roundIndex++;
            this.offerContainer.style.display = "none";
            var activeCases = this.cases.filter(function (c) { return c.status; }).length;
            if (activeCases <= 1) {
                this.endGame();
            }
            else {
                var casesNeeded = board.ROUNDS[this.roundIndex] || 1;
                var next = Math.min(casesNeeded, activeCases - 1);
                this.updateRoundInfo(next);
            }
            this.saveState();
        };
        board.prototype.endGame = function () {
            this.gameOver = true;
            var lastCase = this.cases.find(function (c) { return c.status; });
            var finalValue = lastCase ? lastCase.value : 0;
            if (lastCase) {
                lastCase.button.className = "btn btn-case btn-case-final";
                lastCase.button.innerHTML = "<span class=\"case-label\">".concat(lastCase.label, "</span><span class=\"case-reveal-value\">").concat(formatStrings_1.formatStrings.currency(finalValue), "</span>");
            }
            this.offerContainer.innerHTML = "\n            <div class=\"game-over-panel no-deal-end\">\n                <div class=\"game-over-icon\">&#127881;</div>\n                <div class=\"game-over-title\">YOU WIN!</div>\n                <div class=\"game-over-amount\">".concat(formatStrings_1.formatStrings.currency(finalValue), "</div>\n                <div class=\"game-over-name\">").concat(this.name, " kept their case!</div>\n            </div>\n        ");
            this.offerContainer.style.display = "block";
            if (this.roundInfoEl)
                this.roundInfoEl.style.display = "none";
            this.saveState();
        };
        board.prototype.updateRoundInfo = function (casesLeft) {
            if (!this.roundInfoEl)
                return;
            var roundNum = this.roundIndex + 1;
            this.roundInfoEl.querySelector('.round-label').innerText = "Round ".concat(roundNum);
            this.roundInfoEl.querySelector('.cases-to-open').innerText = String(casesLeft);
        };
        board.prototype.updateValuesBoard = function () {
            if (!this.valuesBoardEl)
                return;
            var sorted = this.cases.slice().sort(function (a, b) { return a.value - b.value; });
            this.valuesBoardEl.innerHTML = sorted.map(function (c) {
                return "<span class=\"value-chip ".concat(c.status ? 'value-active' : 'value-gone', "\">").concat(formatStrings_1.formatStrings.currency(c.value), "</span>");
            }).join('');
        };
        board.prototype.calculateOffer = function () {
            var active = this.cases.filter(function (c) { return c.status; });
            if (active.length === 0)
                return 0;
            var total = active.reduce(function (sum, c) { return sum + c.value; }, 0);
            return Math.round(total / active.length);
        };
        board.prototype.saveState = function () {
            var state = {
                name: this.name,
                cases: this.cases.map(function (c) { return ({
                    label: c.label,
                    value: c.value,
                    status: c.status
                }); }),
                currentOfferValue: this.lastOfferValue,
                roundIndex: this.roundIndex,
                casesOpenedThisRound: this.casesOpenedThisRound,
                waitingForDeal: this.waitingForDeal,
                gameOver: this.gameOver,
                dealTaken: this.dealTaken
            };
            localStorage.setItem(board.STORAGE_KEY, JSON.stringify(state));
        };
        board.prototype.restoreState = function (savedState) {
            this.roundIndex = savedState.roundIndex || 0;
            this.casesOpenedThisRound = savedState.casesOpenedThisRound || 0;
            this.waitingForDeal = savedState.waitingForDeal || false;
            this.gameOver = savedState.gameOver || false;
            this.dealTaken = savedState.dealTaken || false;
            this.lastOfferValue = savedState.currentOfferValue || 0;
            for (var i = 0; i < this.cases.length && i < savedState.cases.length; i++) {
                var bc = this.cases[i];
                var saved = savedState.cases[i];
                bc.status = saved.status;
                if (!saved.status) {
                    bc.button.className = "btn btn-case btn-case-opened";
                    bc.button.innerHTML = "<span class=\"case-label\">".concat(bc.label, "</span><span class=\"case-reveal-value\">").concat(formatStrings_1.formatStrings.currency(bc.value), "</span>");
                }
            }
            this.updateValuesBoard();
            if (this.gameOver) {
                if (this.roundInfoEl)
                    this.roundInfoEl.style.display = "none";
                if (this.dealTaken) {
                    this.offerContainer.innerHTML = "\n                    <div class=\"game-over-panel deal-taken\">\n                        <div class=\"game-over-icon\">&#129309;</div>\n                        <div class=\"game-over-title\">DEAL!</div>\n                        <div class=\"game-over-amount\">".concat(formatStrings_1.formatStrings.currency(this.lastOfferValue), "</div>\n                        <div class=\"game-over-name\">Congratulations, ").concat(this.name, "!</div>\n                    </div>\n                ");
                    this.offerContainer.style.display = "block";
                }
                else {
                    var lastCase = this.cases.find(function (c) { return c.status; });
                    var finalValue = lastCase ? lastCase.value : 0;
                    this.offerContainer.innerHTML = "\n                    <div class=\"game-over-panel no-deal-end\">\n                        <div class=\"game-over-icon\">&#127881;</div>\n                        <div class=\"game-over-title\">YOU WIN!</div>\n                        <div class=\"game-over-amount\">".concat(formatStrings_1.formatStrings.currency(finalValue), "</div>\n                        <div class=\"game-over-name\">").concat(this.name, " kept their case!</div>\n                    </div>\n                ");
                    this.offerContainer.style.display = "block";
                }
            }
            else if (this.waitingForDeal) {
                this.showBankerOffer(this.lastOfferValue);
            }
            else {
                var casesNeeded = board.ROUNDS[this.roundIndex] || 1;
                var remaining = casesNeeded - this.casesOpenedThisRound;
                this.updateRoundInfo(remaining);
            }
        };
        board.loadState = function () {
            var stored = localStorage.getItem(board.STORAGE_KEY);
            if (!stored)
                return null;
            try {
                return JSON.parse(stored);
            }
            catch (e) {
                return null;
            }
        };
        board.clearState = function () {
            localStorage.removeItem(board.STORAGE_KEY);
        };
        board.STORAGE_KEY = 'dealnodeal_state';
        board.ROUNDS = [6, 5, 4, 3, 2, 1, 1, 1, 1];
        return board;
    }());
    exports.board = board;
});
//# sourceMappingURL=board.js.map