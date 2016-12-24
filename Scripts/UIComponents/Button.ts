import {element} from './element';

export class Button extends element {
    constructor () {
      super("a");
    }

    text (text) {
        this.element.innerText = text; 
    }
}
