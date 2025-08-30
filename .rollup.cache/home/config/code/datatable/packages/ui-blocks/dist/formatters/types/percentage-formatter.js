import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const PercentageFormatter = ({ value, field }) => {
    var _a, _b;
    const options = (_a = field.formatter) === null || _a === void 0 ? void 0 : _a.options;
    if (value === null || value === undefined || isNaN(Number(value)))
        return { content: _jsx("span", { className: "text-muted-foreground", children: "-" }) };
    const decimals = (_b = options === null || options === void 0 ? void 0 : options.decimals) !== null && _b !== void 0 ? _b : 1;
    const suffix = (options === null || options === void 0 ? void 0 : options.suffix) || '%';
    let percentageValue = Number(value);
    if (percentageValue <= 1 && percentageValue >= 0)
        percentageValue *= 100;
    const formattedValue = percentageValue.toFixed(decimals);
    return { content: _jsxs("span", { className: options === null || options === void 0 ? void 0 : options.className, children: [formattedValue, suffix] }), style: options === null || options === void 0 ? void 0 : options.style };
};
//# sourceMappingURL=percentage-formatter.js.map