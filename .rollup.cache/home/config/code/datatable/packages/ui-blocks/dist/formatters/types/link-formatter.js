import { jsx as _jsx } from "react/jsx-runtime";
import { applyTemplate } from '../helpers';
export const LinkFormatter = ({ value, field, record }) => {
    var _a;
    const options = (_a = field.formatter) === null || _a === void 0 ? void 0 : _a.options;
    if (!value)
        return { content: _jsx("span", { className: 'text-muted-foreground', children: "-" }) };
    let href;
    if (typeof (options === null || options === void 0 ? void 0 : options.href) === 'function')
        href = options.href(value, record);
    else if (options === null || options === void 0 ? void 0 : options.href)
        href = applyTemplate(options.href, value, record);
    else
        href = String(value);
    let displayText = value;
    if (options === null || options === void 0 ? void 0 : options.template)
        displayText = applyTemplate(options.template, value, record);
    const target = (options === null || options === void 0 ? void 0 : options.target) || '_self';
    return { content: _jsx("a", { href: href, target: target, rel: target === '_blank' ? 'noopener noreferrer' : undefined, className: `hover:underline ${(options === null || options === void 0 ? void 0 : options.linkClassName) || 'text-blue-600'} ${(options === null || options === void 0 ? void 0 : options.className) || ''}`, style: options === null || options === void 0 ? void 0 : options.style, children: displayText }) };
};
//# sourceMappingURL=link-formatter.js.map