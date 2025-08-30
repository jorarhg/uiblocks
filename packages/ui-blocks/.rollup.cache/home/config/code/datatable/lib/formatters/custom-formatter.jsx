import React from 'react';
import { applyTemplate } from './index';
/**
 * Formatter personalizado que permite plantillas y lógica avanzada
 */
export const CustomFormatter = ({ value, field, record }) => {
    var _a;
    const options = (_a = field.formatter) === null || _a === void 0 ? void 0 : _a.options;
    // Si hay un template, aplicarlo
    if (options === null || options === void 0 ? void 0 : options.template) {
        const processedValue = applyTemplate(options.template, value, record);
        return {
            content: (<span className={options === null || options === void 0 ? void 0 : options.className} style={options === null || options === void 0 ? void 0 : options.style}>
          {processedValue}
        </span>)
        };
    }
    // Si no hay template, usar el valor directamente
    return {
        content: (<span className={options === null || options === void 0 ? void 0 : options.className} style={options === null || options === void 0 ? void 0 : options.style}>
        {String(value || '')}
      </span>)
    };
};
//# sourceMappingURL=custom-formatter.jsx.map