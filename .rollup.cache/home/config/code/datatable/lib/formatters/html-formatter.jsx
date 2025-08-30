import React from 'react';
import { applyTemplate } from './index';
/**
 * Formatter para HTML personalizado (usar con precaución)
 */
export const HtmlFormatter = ({ value, field, record }) => {
    var _a;
    const options = (_a = field.formatter) === null || _a === void 0 ? void 0 : _a.options;
    let htmlContent = String(value || '');
    // Aplicar template si existe
    if (options === null || options === void 0 ? void 0 : options.template) {
        htmlContent = applyTemplate(options.template, value, record);
    }
    return {
        content: (<div className={options === null || options === void 0 ? void 0 : options.className} style={options === null || options === void 0 ? void 0 : options.style} dangerouslySetInnerHTML={{ __html: htmlContent }}/>)
    };
};
//# sourceMappingURL=html-formatter.jsx.map