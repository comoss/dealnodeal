import {
    showDivButton
} from './showDivButton';
import {
    Button
} from '../UIComponents/Button';
import {
    inputGroup
} from './inputGroup';
import {
    div
} from '../UIComponents/div';
import {
    input
} from '../UIComponents/input';
import {
    formatStrings
} from '../Utils/formatStrings';

export class createGameForm {
    mainContainer = new div();
    teamName = new input();
    newGameButton = new Button();
    inputGroups: inputGroup[] = [];
    teamInputGroup = new div();
    amountsInput = new div();
    hideAmountsInputGroup = new Button();
    // Family-friendly values: $0.01 – $100 (usable with real cash)
    defaults = [0.01, 0.05, 0.10, 0.25, 0.50, 1, 1.50, 2, 2.50, 3, 4, 5, 7, 10, 12, 15, 20, 25, 30, 35, 40, 50, 60, 75, 100];
    // Original TV show values (kept for the "TV Show" preset)
    private tvDefaults = [0.01, 1, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750, 1000, 5000, 10000, 25000, 50000, 75000, 100000, 200000, 300000, 400000, 500000, 750000, 1000000];
    showinputs = new Button();

    constructor() {
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

        for (let i = 0; i < 26; i++) {
            const group = new inputGroup();
            group.text.defaultValue(formatStrings.currency(this.defaults[i]));
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
        const familyBtn = new Button();
        familyBtn.text("Family");
        familyBtn.addClass("btn");
        familyBtn.addClass("btn-outline-secondary");
        familyBtn.addClass("btn-sm");
        familyBtn.el().title = "Load family-friendly amounts ($0.01\u2013$100)";
        this.teamInputGroup.append(familyBtn.el());

        const tvBtn = new Button();
        tvBtn.text("TV Show");
        tvBtn.addClass("btn");
        tvBtn.addClass("btn-outline-secondary");
        tvBtn.addClass("btn-sm");
        tvBtn.el().title = "Load original TV show amounts ($0.01\u2013$1,000,000)";
        this.teamInputGroup.append(tvBtn.el());

        const groups = this.inputGroups;
        const familyDefaults = this.defaults;
        const tvDefaults = this.tvDefaults;

        familyBtn.el().addEventListener("click", function () {
            for (let i = 0; i < groups.length; i++) {
                groups[i].text.setValue(formatStrings.currency(familyDefaults[i]));
                groups[i].value.setValue(familyDefaults[i]);
            }
        });

        tvBtn.el().addEventListener("click", function () {
            for (let i = 0; i < groups.length; i++) {
                groups[i].text.setValue(formatStrings.currency(tvDefaults[i]));
                groups[i].value.setValue(tvDefaults[i]);
            }
        });
    }
}
