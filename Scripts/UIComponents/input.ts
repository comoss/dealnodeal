import {element} from './element';

export class input extends element {
    element: HTMLInputElement; 
    
    constructor () {
        super("input");
    }

    defaultValue (value:any){
        this.element.defaultValue = value;
    }

    setValue (value:any){
        this.element.value = String(value);
        this.element.defaultValue = String(value);
    }

    value () {
        return this.element.value;
    }

    placeholder (text:string) {
        this.element.placeholder = text; 
    }
}