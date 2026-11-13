define(["require", "exports", "../UIComponents/Button", "./inputGroup", "../UIComponents/div", "../UIComponents/input", "../Utils/formatStrings"], function (require, exports, Button_1, inputGroup_1, div_1, input_1, formatStrings_1) {
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
            // Family-friendly values: $0.01 – $100 (usable with real cash) — 26 values
            this.defaults = [0.01, 0.05, 0.10, 0.25, 0.50, 1, 1.50, 2, 2.50, 3, 4, 5, 7, 10, 12, 15, 20, 25, 30, 35, 40, 45, 50, 60, 75, 100];
            // Original TV show values (kept for the "TV Show" preset)
            this.tvDefaults = [0.01, 1, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750, 1000, 5000, 10000, 25000, 50000, 75000, 100000, 200000, 300000, 400000, 500000, 750000, 1000000];
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
            this.teamInputGroup.addClass("flex-wrap");
            this.mainContainer.append(this.teamInputGroup.el());
            for (var i = 0; i < 26; i++) {
                var group = new inputGroup_1.inputGroup();
                group.text.defaultValue(formatStrings_1.formatStrings.currency(this.defaults[i]));
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
            // Preset buttons
            var familyBtn = new Button_1.Button();
            familyBtn.text("Family");
            familyBtn.addClass("btn");
            familyBtn.addClass("btn-outline-secondary");
            familyBtn.addClass("btn-sm");
            familyBtn.el().title = "Load family-friendly amounts ($0.01\u2013$100)";
            this.teamInputGroup.append(familyBtn.el());
            var tvBtn = new Button_1.Button();
            tvBtn.text("TV Show");
            tvBtn.addClass("btn");
            tvBtn.addClass("btn-outline-secondary");
            tvBtn.addClass("btn-sm");
            tvBtn.el().title = "Load original TV show amounts ($0.01\u2013$1,000,000)";
            this.teamInputGroup.append(tvBtn.el());
            var groups = this.inputGroups;
            var familyDefaults = this.defaults;
            var tvDefaults = this.tvDefaults;
            familyBtn.el().addEventListener("click", function () {
                for (var i = 0; i < groups.length; i++) {
                    groups[i].text.setValue(formatStrings_1.formatStrings.currency(familyDefaults[i]));
                    groups[i].value.setValue(familyDefaults[i]);
                }
            });
            tvBtn.el().addEventListener("click", function () {
                for (var i = 0; i < groups.length; i++) {
                    groups[i].text.setValue(formatStrings_1.formatStrings.currency(tvDefaults[i]));
                    groups[i].value.setValue(tvDefaults[i]);
                }
            });
        }
        return createGameForm;
    }());
    exports.createGameForm = createGameForm;
});
//# sourceMappingURL=createGameForm.js.map