import { Button } from "./../UIComponents/Button";

export class showDivButton extends Button {
        
    constructor () {
        super()
        this.element.className = "btn btn-success";
        this.element.addEventListener("click", this.OnClick); 
    }

    OnClick () {
        console.log("I should do some event"); 
    }
}