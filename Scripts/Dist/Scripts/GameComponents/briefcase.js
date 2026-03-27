define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.briefcase = void 0;
    var briefcase = /** @class */ (function () {
        function briefcase(obj) {
            this.value = Number(obj.value.value());
            this.label = obj.text.value();
            this.button = document.createElement("a");
            this.button.className = "btn btn-case";
            this.button.style.cursor = "pointer";
            this.button.innerHTML = "<span class=\"case-number\">".concat(this.label, "</span>");
            this.status = true;
        }
        return briefcase;
    }());
    exports.briefcase = briefcase;
});
//# sourceMappingURL=briefcase.js.map