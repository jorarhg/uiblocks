import { jsx as _jsx } from "react/jsx-runtime";
import { applyTemplate } from '../helpers';
export const CustomFormatter = ({ value, field, record }) => {
    var _a;
    const options = (_a = field.formatter) === null || _a === void 0 ? void 0 : _a.options;
    if (options === null || options === void 0 ? void 0 : options.template) {
        const processedValue = applyTemplate(options.template, value, record);
        return { content: _jsx("span", { className: options === null || options === void 0 ? void 0 : options.className, style: options === null || options === void 0 ? void 0 : options.style, children: processedValue }) };
    }
    return { content: _jsx("span", { className: options === null || options === void 0 ? void 0 : options.className, style: options === null || options === void 0 ? void 0 : options.style, children: String(value || '') }) };
};
//# sourceMappingURL=custom-formatter.js.map