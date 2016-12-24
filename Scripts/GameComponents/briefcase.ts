import { formatStrings } from "./../Utils/formatStrings";
import {inputGroup } from '../GameCreationComponents/inputGroup';

export class briefcase {
    button: HTMLAnchorElement;
    value: number; 
    status: boolean;

    constructor(obj: inputGroup) {
        this.value = Number(obj.value.value());

        this.button = document.createElement("a");
        this.button.innerText = obj.text.value();
        this.button.className = "btn btn-primary";
        // this.button.style.width = "102px";
        this.button.style.color = "white";
        this.button.style.borderRadius = "0px";

        this.status = true; 
    }
}
