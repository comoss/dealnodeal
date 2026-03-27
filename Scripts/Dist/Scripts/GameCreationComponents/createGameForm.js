define(["require", "exports", "../UIComponents/Button", "./inputGroup", "../UIComponents/div", "../UIComponents/input"], function (require, exports, Button_1, inputGroup_1, div_1, input_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createGameForm = void 0;
    var createGameForm = /** @class */ (function () {
        function createGameForm() {
            this.mainContainer = new div_1.div();
            this.teamName = new input_1.input();
            this.newGameButton = new Button_1.Button();
            this.inputGroups = [];
            this.teamInputGroup = new div_1.div();
            this.amountsInput = new div_1.div();
            this.hideAmountsInputGroup = new Button_1.Button();
            // Real Deal or No Deal US values (26 cases)
            this.defaults = [0.01, 1, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750, 1000, 5000, 10000, 25000, 50000, 75000, 100000, 200000, 300000, 400000, 500000, 750000, 1000000];
            this.showinputs = new Button_1.Button();
            this.mainContainer.addClass("setup-form");
            this.teamName.placeholder("Player name");
            this.teamName.addClass("form-control");
            this.teamName.id("gameName");
            this.newGameButton.addClass("btn");
            this.newGameButton.addClass("btn-primary");
            this.newGameButton.text("New Game");
            this.newGameButton.el().style.color = "white";
            this.newGameButton.el().id = 'newGame';
            this.teamInputGroup.append(this.teamName.el());
            this.newGameButton.appendto(this.teamInputGroup.el());
            this.teamInputGroup.addClass("d-flex");
            this.teamInputGroup.addClass("align-items-center");
            this.teamInputGroup.addClass("gap-2");
            this.teamInputGroup.addClass("mb-2");
            this.mainContainer.append(this.teamInputGroup.el());
            for (var i = 0; i < 26; i++) {
                var group = new inputGroup_1.inputGroup();
                group.text.defaultValue("Case ".concat(i + 1));
                group.value.defaultValue(this.defaults[i]);
                this.inputGroups.push(group);
                this.amountsInput.append(group.container.el());
            }
            this.amountsInput.addClass("row");
            this.amountsInput.addClass("g-1");
            this.mainContainer.append(this.amountsInput.el());
            this.teamInputGroup.append(this.showinputs.el());
            this.teamInputGroup.append(this.hideAmountsInputGroup.el());
            var ai = this.amountsInput;
            var hi = this.hideAmountsInputGroup;
            hi.text("Hide Values");
            hi.addClass("btn");
            hi.addClass("btn-outline-secondary");
            hi.addClass("btn-sm");
            hi.show();
            var so = this.showinputs;
            so.text("Edit Values");
            so.addClass("btn");
            so.addClass("btn-outline-secondary");
            so.addClass("btn-sm");
            so.hide();
            hi.el().addEventListener("click", function () {
                ai.hide();
                hi.hide();
                so.show();
            });
            so.el().addEventListener("click", function () {
                ai.show();
                hi.show();
                so.hide();
            });
        }
        return createGameForm;
    }());
    exports.createGameForm = createGameForm;
});
//# sourceMappingURL=createGameForm.js.map