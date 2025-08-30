import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const CurrencyFormatter = ({ value, field }) => {
    var _a, _b;
    const options = (_a = field.formatter) === null || _a === void 0 ? void 0 : _a.options;
    if (value === null || value === undefined || isNaN(Number(value)))
        return { content: _jsx("span", { className: "text-muted-foreground", children: "-" }) };
    const currency = (options === null || options === void 0 ? void 0 : options.currency) || 'EUR';
    const decimals = (_b = options === null || options === void 0 ? void 0 : options.decimals) !== null && _b !== void 0 ? _b : 2;
    const locale = (options === null || options === void 0 ? void 0 : options.locale) || 'es-ES';
    try {
        const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency, minimumFractionDigits: decimals, maximumFractionDigits: decimals });
        const formattedValue = formatter.format(Number(value));
        return { content: _jsx("span", { className: options === null || options === void 0 ? void 0 : options.className, children: formattedValue }), style: options === null || options === void 0 ? void 0 : options.style };
    }
    catch (_c) {
        return { content: _jsxs("span", { className: options === null || options === void 0 ? void 0 : options.className, children: [Number(value).toFixed(decimals), " ", currency] }), style: options === null || options === void 0 ? void 0 : options.style };
    }
};
//# sourceMappingURL=currency-formatter.js.map