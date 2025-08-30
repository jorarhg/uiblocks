import { jsx as _jsx } from "react/jsx-runtime";
import { applyTemplate } from '../helpers';
export const DefaultFormatter = ({ value, field, record }) => {
    var _a;
    const options = (_a = field.formatter) === null || _a === void 0 ? void 0 : _a.options;
    let displayValue = value;
    if (options === null || options === void 0 ? void 0 : options.template)
        displayValue = applyTemplate(options.template, value, record);
    else
        displayValue = (value === null || value === void 0 ? void 0 : value.toString()) || '';
    return {
        content: _jsx("span", { className: options === null || options === void 0 ? void 0 : options.className, children: displayValue }),
        className: options === null || options === void 0 ? void 0 : options.className,
        style: options === null || options === void 0 ? void 0 : options.style
    };
};
//# sourceMappingURL=default-formatter.js.map