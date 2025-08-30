import { jsx as _jsx } from "react/jsx-runtime";
import { applyTemplate } from '../helpers';
export const HtmlFormatter = ({ value, field, record }) => {
    var _a;
    const options = (_a = field.formatter) === null || _a === void 0 ? void 0 : _a.options;
    let htmlContent = String(value || '');
    if (options === null || options === void 0 ? void 0 : options.template)
        htmlContent = applyTemplate(options.template, value, record);
    return { content: _jsx("div", { className: options === null || options === void 0 ? void 0 : options.className, style: options === null || options === void 0 ? void 0 : options.style, dangerouslySetInnerHTML: { __html: htmlContent } }) };
};
//# sourceMappingURL=html-formatter.js.map