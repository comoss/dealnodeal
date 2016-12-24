import { div } from '../UIComponents/div';
import { input } from '../UIComponents/input';

export class inputGroup {
    container = new div();
    text = new input();
    value = new input(); 

    constructor () {
        this.container.addClass("col-xs-4");

        this.text.placeholder("Briefcase item");
        this.text.addClass("form-control");
        
        this.value.placeholder("item value");
        this.value.addClass("form-control");

        this.text.appendto(this.container.el());
        this.value.appendto(this.container.el());

        this.container.el().style.border = '1px solid black'
    }
}