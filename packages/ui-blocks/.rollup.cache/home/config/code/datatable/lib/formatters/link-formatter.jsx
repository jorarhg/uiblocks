import React from 'react';
import { applyTemplate } from './index';
/**
 * Formatter para enlaces con configuración flexible
 */
export const LinkFormatter = ({ value, field, record }) => {
    var _a;
    const options = (_a = field.formatter) === null || _a === void 0 ? void 0 : _a.options;
    if (!value) {
        return {
            content: <span className="text-muted-foreground">-</span>
        };
    }
    // Determinar el href
    let href;
    if (typeof (options === null || options === void 0 ? void 0 : options.href) === 'function') {
        href = options.href(value, record);
    }
    else if (options === null || options === void 0 ? void 0 : options.href) {
        href = applyTemplate(options.href, value, record);
    }
    else {
        // Si no se especifica href, asumir que el value es la URL
        href = String(value);
    }
    // Determinar el texto a mostrar
    let displayText = value;
    if (options === null || options === void 0 ? void 0 : options.template) {
        displayText = applyTemplate(options.template, value, record);
    }
    // Determinar target
    const target = (options === null || options === void 0 ? void 0 : options.target) || '_self';
    return {
        content: (<a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} className={`hover:underline ${(options === null || options === void 0 ? void 0 : options.linkClassName) || 'text-blue-600'} ${(options === null || options === void 0 ? void 0 : options.className) || ''}`} style={options === null || options === void 0 ? void 0 : options.style}>
        {displayText}
      </a>)
    };
};
//# sourceMappingURL=link-formatter.jsx.map