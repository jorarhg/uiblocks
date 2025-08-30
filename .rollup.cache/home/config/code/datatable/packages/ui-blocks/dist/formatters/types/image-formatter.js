import { jsx as _jsx } from "react/jsx-runtime";
export const ImageFormatter = ({ value, field }) => {
    var _a;
    const options = (_a = field.formatter) === null || _a === void 0 ? void 0 : _a.options;
    if (!value)
        return { content: _jsx("span", { className: 'text-muted-foreground', children: "-" }) };
    const width = (options === null || options === void 0 ? void 0 : options.width) || 32;
    const height = (options === null || options === void 0 ? void 0 : options.height) || 32;
    const alt = (options === null || options === void 0 ? void 0 : options.alt) || 'Image';
    const fallbackSrc = (options === null || options === void 0 ? void 0 : options.fallbackSrc) || '/placeholder.svg';
    return { content: _jsx("img", { src: String(value), alt: alt, width: width, height: height, className: `rounded ${(options === null || options === void 0 ? void 0 : options.className) || ''}`, style: options === null || options === void 0 ? void 0 : options.style, onError: (e) => { const t = e.target; if (t.src !== fallbackSrc)
                t.src = fallbackSrc; } }) };
};
//# sourceMappingURL=image-formatter.js.map