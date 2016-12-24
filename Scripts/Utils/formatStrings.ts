export module formatStrings {
    // currency formatter: $140.23
    export function currency(currencyString: any): string {
        return currencyString.toLocaleString("en-US", { style: "currency", currency: "USD" })
    }
};
