export class element {
    element: HTMLElement;

    constructor (typeOfElement:string) {
        this.element = document.createElement(typeOfElement); 
    }

    append (newChild) {
        this.element.appendChild(newChild)
    }

    appendto (newParent:HTMLElement) {
        newParent.appendChild(this.element)
    }

    addClass (newClass:string) {
        this.element.classList.add(newClass);
    }

    el () {
        return this.element; 
    }
    
    event(typeOfEvent, Function) {
      this.element.addEventListener(typeOfEvent, function () { Function })
    }

    removeclass (exsistingClass:string) {
        this.element.classList.remove(exsistingClass);
    }

    hide() {
        this.element.style.display = "none";
    }

    show() {
        this.element.style.display = "block";
    }

    id(idstring:string) {
        this.element.id = idstring; 
    }
}