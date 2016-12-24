var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './element'], function (require, exports, element_1) {
    "use strict";
    var input = (function (_super) {
        __extends(input, _super);
        function input() {
            _super.call(this, "input");
        }
        input.prototype.defaultValue = function (value) {
            this.element.defaultValue = value;
        };
        input.prototype.value = function () {
            return this.element.value;
        };
        input.prototype.placeholder = function (text) {
            this.element.placeholder = text;
        };
        return input;
    }(element_1.element));
    exports.input = input;
});
//# sourceMappingURL=input.js.map