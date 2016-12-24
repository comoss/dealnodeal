define(["require", "exports", '../UIComponents/Button', './inputGroup', '../UIComponents/div', '../UIComponents/input', '../Utils/formatStrings'], function (require, exports, Button_1, inputGroup_1, div_1, input_1, formatStrings_1) {
    "use strict";
    var createGameForm = (function () {
        function createGameForm() {
            this.mainContainer = new div_1.div();
            this.teamName = new input_1.input();
            this.newGameButton = new Button_1.Button();
            this.inputGroups = [];
            this.teamInputGroup = new div_1.div();
            this.amountsInput = new div_1.div();
            this.hideAmountsInputGroup = new Button_1.Button();
            this.defaults = [10, 20, 30, 40, 50, 60, 75, 80, 90, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 900, 1000];
            this.showinputs = new Button_1.Button();
            this.teamName.placeholder("Team name");
            this.teamName.addClass("form-control");
            this.teamName.id("gameName");
            this.newGameButton.addClass("btn");
            this.newGameButton.addClass("btn-primary");
            this.newGameButton.text("New Game");
            this.newGameButton.el().style.color = "white";
            this.newGameButton.el().id = 'newGame';
            this.teamInputGroup.append(this.teamName.el());
            this.newGameButton.appendto(this.teamInputGroup.el());
            this.teamInputGroup.addClass("form-inline");
            this.mainContainer.append(this.teamInputGroup.el());
            for (var i = 0; i < 26; i++) {
                var group = new inputGroup_1.inputGroup();
                var str = this.defaults[i];
                group.text.defaultValue(formatStrings_1.formatStrings.currency(str));
                group.value.defaultValue(str);
                this.inputGroups.push(group);
                this.amountsInput.append(group.container.el());
            }
            this.mainContainer.append(this.amountsInput.el());
            this.teamInputGroup.append(this.showinputs.el());
            this.teamInputGroup.append(this.hideAmountsInputGroup.el());
            var ai = this.amountsInput;
            var hi = this.hideAmountsInputGroup;
            hi.text("hide");
            hi.addClass("btn");
            hi.addClass("btn-info");
            hi.addClass("col-xs-12");
            hi.addClass("col-sm-2");
            hi.show();
            var so = this.showinputs;
            so.text("Show");
            so.addClass("btn");
            so.addClass("btn-info");
            so.hide();
            so.addClass("col-xs-12");
            so.addClass("col-sm-2");
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