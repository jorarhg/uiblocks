import React from 'react';
/**
 * Formatter para porcentajes con configuración de decimales
 */
export const PercentageFormatter = ({ value, field }) => {
    var _a, _b;
    const options = (_a = field.formatter) === null || _a === void 0 ? void 0 : _a.options;
    if (value === null || value === undefined || isNaN(Number(value))) {
        return {
            content: <span className="text-muted-foreground">-</span>
        };
    }
    const decimals = (_b = options === null || options === void 0 ? void 0 : options.decimals) !== null && _b !== void 0 ? _b : 1;
    const suffix = (options === null || options === void 0 ? void 0 : options.suffix) || '%';
    // Convertir a porcentaje (asumir que el valor viene como decimal: 0.25 -> 25%)
    let percentageValue = Number(value);
    // Si el valor es menor que 1, asumir que está en formato decimal
    if (percentageValue <= 1 && percentageValue >= 0) {
        percentageValue *= 100;
    }
    const formattedValue = percentageValue.toFixed(decimals);
    return {
        content: (<span className={options === null || options === void 0 ? void 0 : options.className}>
        {formattedValue}{suffix}
      </span>),
        style: options === null || options === void 0 ? void 0 : options.style
    };
};
//# sourceMappingURL=percentage-formatter.jsx.map