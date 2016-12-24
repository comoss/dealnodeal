var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './element'], function (require, exports, element_1) {
    "use strict";
    var div = (function (_super) {
        __extends(div, _super);
        function div() {
            _super.call(this, "div");
        }
        return div;
    }(element_1.element));
    exports.div = div;
});
//# sourceMappingURL=div.js.map