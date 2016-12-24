var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './element'], function (require, exports, element_1) {
    "use strict";
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button() {
            _super.call(this, "a");
        }
        Button.prototype.text = function (text) {
            this.element.innerText = text;
        };
        return Button;
    }(element_1.element));
    exports.Button = Button;
});
//# sourceMappingURL=Button.js.map