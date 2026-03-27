define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.formatStrings = void 0;
    var formatStrings;
    (function (formatStrings) {
        // currency formatter: $140.23
        function currency(currencyString) {
            return currencyString.toLocaleString("en-US", { style: "currency", currency: "USD" });
        }
        formatStrings.currency = currency;
    })(formatStrings || (exports.formatStrings = formatStrings = {}));
    ;
});
//# sourceMappingURL=formatStrings.js.map