var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./element"], function (require, exports, element_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.input = void 0;
    var input = /** @class */ (function (_super) {
        __extends(input, _super);
        function input() {
            return _super.call(this, "input") || this;
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