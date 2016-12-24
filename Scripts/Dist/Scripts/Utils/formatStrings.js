define(["require", "exports"], function (require, exports) {
    "use strict";
    var formatStrings;
    (function (formatStrings) {
        // currency formatter: $140.23
        function currency(currencyString) {
            return currencyString.toLocaleString("en-US", { style: "currency", currency: "USD" });
        }
        formatStrings.currency = currency;
    })(formatStrings = exports.formatStrings || (exports.formatStrings = {}));
    ;
});
//# sourceMappingURL=formatStrings.js.map