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
    exports.div = void 0;
    var div = /** @class */ (function (_super) {
        __extends(div, _super);
        function div() {
            return _super.call(this, "div") || this;
        }
        return div;
    }(element_1.element));
    exports.div = div;
});
//# sourceMappingURL=div.js.map