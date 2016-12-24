define(["require", "exports", '../UIComponents/div', '../UIComponents/input'], function (require, exports, div_1, input_1) {
    "use strict";
    var inputGroup = (function () {
        function inputGroup() {
            this.container = new div_1.div();
            this.text = new input_1.input();
            this.value = new input_1.input();
            this.container.addClass("col-xs-4");
            this.text.placeholder("Briefcase item");
            this.text.addClass("form-control");
            this.value.placeholder("item value");
            this.value.addClass("form-control");
            this.text.appendto(this.container.el());
            this.value.appendto(this.container.el());
            this.container.el().style.border = '1px solid black';
        }
        return inputGroup;
    }());
    exports.inputGroup = inputGroup;
});
//# sourceMappingURL=inputGroup.js.map