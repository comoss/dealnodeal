import { div } from '../UIComponents/div';
import { input } from '../UIComponents/input';

export class inputGroup {
    container = new div();
    text = new input();
    value = new input();

    constructor () {
        this.container.addClass("col-4");
        this.container.addClass("col-md-2");

        this.text.placeholder("Case label");
        this.text.addClass("form-control");

        this.value.placeholder("Value");
        this.value.addClass("form-control");

        this.text.appendto(this.container.el());
        this.value.appendto(this.container.el());

        this.container.el().style.border = '1px solid #2a2a50';
        this.container.el().style.padding = '4px';
    }
}
