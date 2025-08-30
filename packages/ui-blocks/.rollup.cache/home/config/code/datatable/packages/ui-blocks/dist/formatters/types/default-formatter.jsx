import React from 'react';
import { applyTemplate } from '../registry';
export const DefaultFormatter = ({ value, field, record }) => {
    var _a;
    const options = (_a = field.formatter) === null || _a === void 0 ? void 0 : _a.options;
    let displayValue = value;
    if (options === null || options === void 0 ? void 0 : options.template)
        displayValue = applyTemplate(options.template, value, record);
    else
        displayValue = (value === null || value === void 0 ? void 0 : value.toString()) || '';
    return {
        content: <span className={options === null || options === void 0 ? void 0 : options.className}>{displayValue}</span>,
        className: options === null || options === void 0 ? void 0 : options.className,
        style: options === null || options === void 0 ? void 0 : options.style
    };
};
//# sourceMappingURL=default-formatter.jsx.map