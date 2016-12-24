var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./../UIComponents/Button"], function (require, exports, Button_1) {
    "use strict";
    var showDivButton = (function (_super) {
        __extends(showDivButton, _super);
        function showDivButton() {
            _super.call(this);
            this.element.className = "btn btn-success";
            this.element.addEventListener("click", this.OnClick);
        }
        showDivButton.prototype.OnClick = function () {
            console.log("I should do some event");
        };
        return showDivButton;
    }(Button_1.Button));
    exports.showDivButton = showDivButton;
});
//# sourceMappingURL=showDivButton.js.map