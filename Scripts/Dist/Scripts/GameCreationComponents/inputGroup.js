define(["require", "exports", "../UIComponents/div", "../UIComponents/input"], function (require, exports, div_1, input_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.inputGroup = void 0;
    var inputGroup = /** @class */ (function () {
        function inputGroup() {
            this.container = new div_1.div();
            this.text = new input_1.input();
            this.value = new input_1.input();
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
        return inputGroup;
    }());
    exports.inputGroup = inputGroup;
});
//# sourceMappingURL=inputGroup.js.map