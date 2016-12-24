define(["require", "exports"], function (require, exports) {
    "use strict";
    var briefcase = (function () {
        function briefcase(obj) {
            this.value = Number(obj.value.value());
            this.button = document.createElement("a");
            this.button.innerText = obj.text.value();
            this.button.className = "btn btn-primary";
            // this.button.style.width = "102px";
            this.button.style.color = "white";
            this.button.style.borderRadius = "0px";
            this.status = true;
        }
        return briefcase;
    }());
    exports.briefcase = briefcase;
});
//# sourceMappingURL=briefcase.js.map