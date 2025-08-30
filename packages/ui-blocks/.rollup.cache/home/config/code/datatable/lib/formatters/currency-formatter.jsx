import React from 'react';
/**
 * Formatter para monedas con soporte internacional
 */
export const CurrencyFormatter = ({ value, field }) => {
    var _a, _b;
    const options = (_a = field.formatter) === null || _a === void 0 ? void 0 : _a.options;
    if (value === null || value === undefined || isNaN(Number(value))) {
        return {
            content: <span className="text-muted-foreground">-</span>
        };
    }
    const currency = (options === null || options === void 0 ? void 0 : options.currency) || 'EUR';
    const decimals = (_b = options === null || options === void 0 ? void 0 : options.decimals) !== null && _b !== void 0 ? _b : 2;
    const locale = (options === null || options === void 0 ? void 0 : options.locale) || 'es-ES';
    try {
        const formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        });
        const formattedValue = formatter.format(Number(value));
        return {
            content: (<span className={options === null || options === void 0 ? void 0 : options.className}>
          {formattedValue}
        </span>),
            style: options === null || options === void 0 ? void 0 : options.style
        };
    }
    catch (error) {
        // Fallback si hay error con la configuración de moneda
        return {
            content: (<span className={options === null || options === void 0 ? void 0 : options.className}>
          {Number(value).toFixed(decimals)} {currency}
        </span>),
            style: options === null || options === void 0 ? void 0 : options.style
        };
    }
};
//# sourceMappingURL=currency-formatter.jsx.map