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
define(["require", "exports", "./../UIComponents/Button"], function (require, exports, Button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.showDivButton = void 0;
    var showDivButton = /** @class */ (function (_super) {
        __extends(showDivButton, _super);
        function showDivButton() {
            var _this = _super.call(this) || this;
            _this.element.className = "btn btn-success";
            _this.element.addEventListener("click", _this.OnClick);
            return _this;
        }
        showDivButton.prototype.OnClick = function () {
            console.log("I should do some event");
        };
        return showDivButton;
    }(Button_1.Button));
    exports.showDivButton = showDivButton;
});
//# sourceMappingURL=showDivButton.js.map