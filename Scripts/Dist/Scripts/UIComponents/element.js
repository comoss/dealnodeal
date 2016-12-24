define(["require", "exports"], function (require, exports) {
    "use strict";
    var element = (function () {
        function element(typeOfElement) {
            this.element = document.createElement(typeOfElement);
        }
        element.prototype.append = function (newChild) {
            this.element.appendChild(newChild);
        };
        element.prototype.appendto = function (newParent) {
            newParent.appendChild(this.element);
        };
        element.prototype.addClass = function (newClass) {
            this.element.classList.add(newClass);
        };
        element.prototype.el = function () {
            return this.element;
        };
        element.prototype.event = function (typeOfEvent, Function) {
            this.element.addEventListener(typeOfEvent, function () { Function; });
        };
        element.prototype.removeclass = function (exsistingClass) {
            this.element.classList.remove(exsistingClass);
        };
        element.prototype.hide = function () {
            this.element.style.display = "none";
        };
        element.prototype.show = function () {
            this.element.style.display = "block";
        };
        element.prototype.id = function (idstring) {
            this.element.id = idstring;
        };
        return element;
    }());
    exports.element = element;
});
//# sourceMappingURL=element.js.map