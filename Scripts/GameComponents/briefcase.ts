import {inputGroup } from '../GameCreationComponents/inputGroup';

export class briefcase {
    button: HTMLAnchorElement;
    value: number;
    status: boolean;
    label: string;

    constructor(obj: inputGroup) {
        this.value = Number(obj.value.value());
        this.label = obj.text.value();

        this.button = document.createElement("a");
        this.button.className = "btn btn-case";
        this.button.style.cursor = "pointer";
        this.button.innerHTML = `<span class="case-number">${this.label}</span>`;

        this.status = true;
    }
}
