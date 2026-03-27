define(["require", "exports", "./../Utils/formatStrings", "./briefcase"], function (require, exports, formatStrings_1, briefcase_1) {
    "use strict";
    var board = (function () {
        function board(name, briefcaseValues) {
            this.name = name;
            this.boardContainer = document.createElement("div");
            this.boardContainer.className = "col-xs-12";
            this.dollarAmounts = briefcaseValues;
            this.cases = [];
            this.currentOffer = document.createElement("p");
            this.currentOffer.className = "text-xs-center text-success font-weight-bold";
            this.currentOffer.innerText = "$0";
        }
        board.prototype.populateValues = function (displayDiv) {
            var _this = this;
            this.boardContainer.insertAdjacentHTML("AfterBegin", "<h4 class=\"text-xs-center\">" + this.name + "</h4>");
            var _loop_1 = function(c) {
                var Briefcase = new briefcase_1.briefcase(c);
                Briefcase.button.addEventListener("click", function () {
                    if (Briefcase.status === true) {
                        Briefcase.status = false;
                        Briefcase.button.className = "btn btn-danger";
                    }
                    else {
                        Briefcase.status = true;
                        Briefcase.button.className = "btn btn-primary";
                    }
                    _this.currentOffer.innerText = formatStrings_1.formatStrings.currency(_this.calculateOffer());
                    _this.saveState();
                });
                this_1.cases.push(Briefcase);
                this_1.boardContainer.appendChild(Briefcase.button);
                this_1.boardContainer.appendChild(this_1.currentOffer);
            };
            var this_1 = this;
            for (var _i = 0, _a = this.dollarAmounts; _i < _a.length; _i++) {
                var c = _a[_i];
                _loop_1(c);
            }
            displayDiv.appendChild(this.boardContainer);
        };
        board.prototype.calculateOffer = function () {
            var AmountActive = 0;
            var median = 0;
            for (var _i = 0, _a = this.cases; _i < _a.length; _i++) {
                var c = _a[_i];
                if (c.status === true) {
                    AmountActive++;
                    if (AmountActive === 26) {
                        median = 0;
                    }
                    else {
                        median = median + c.value;
                    }
                }
            }
            return median / AmountActive;
        };
        board.prototype.saveState = function () {
            var state = {
                name: this.name,
                cases: this.cases.map(function (c) { return ({
                    label: c.button.innerText,
                    value: c.value,
                    status: c.status
                }); }),
                currentOffer: this.currentOffer.innerText
            };
            localStorage.setItem(board.STORAGE_KEY, JSON.stringify(state));
        };
        board.prototype.restoreState = function (savedCases, savedOffer) {
            for (var i = 0; i < this.cases.length && i < savedCases.length; i++) {
                this.cases[i].status = savedCases[i].status;
                this.cases[i].button.className = savedCases[i].status ? "btn btn-primary" : "btn btn-danger";
            }
            this.currentOffer.innerText = savedOffer;
        };
        board.loadState = function () {
            var stored = localStorage.getItem(board.STORAGE_KEY);
            if (!stored) return null;
            try {
                return JSON.parse(stored);
            } catch (e) {
                return null;
            }
        };
        board.clearState = function () {
            localStorage.removeItem(board.STORAGE_KEY);
        };
        board.STORAGE_KEY = 'dealnodeal_state';
        return board;
    }());
    exports.board = board;
});
