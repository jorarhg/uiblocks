import React from 'react';
import { Badge } from '@/components/ui/badge';
import { applyTemplate } from './index';
import { CircleIcon, CircleDashedIcon, Clock, CheckCircle, XCircle, AlertCircle, Star, Heart, Zap } from 'lucide-react';
// Registry de iconos disponibles para badges
const BADGE_ICONS = {
    'circle': CircleIcon,
    'circle-dashed': CircleDashedIcon,
    'clock': Clock,
    'check-circle': CheckCircle,
    'x-circle': XCircle,
    'alert-circle': AlertCircle,
    'star': Star,
    'heart': Heart,
    'zap': Zap
};
/**
 * Formatter para badges con soporte completo de configuración
 */
export const BadgeFormatter = ({ value, field, record }) => {
    var _a, _b;
    const options = (_a = field.formatter) === null || _a === void 0 ? void 0 : _a.options;
    // Buscar configuración específica para este valor
    const valueConfig = (_b = options === null || options === void 0 ? void 0 : options.valueMap) === null || _b === void 0 ? void 0 : _b[value];
    // Determinar la variante del badge
    const variant = (valueConfig === null || valueConfig === void 0 ? void 0 : valueConfig.variant) || (options === null || options === void 0 ? void 0 : options.variant) || 'default';
    // Determinar el texto a mostrar
    let displayText = (valueConfig === null || valueConfig === void 0 ? void 0 : valueConfig.label) || value;
    if (options === null || options === void 0 ? void 0 : options.template) {
        displayText = applyTemplate(options.template, value, record);
    }
    // Determinar el icono
    const iconKey = (valueConfig === null || valueConfig === void 0 ? void 0 : valueConfig.icon) || (options === null || options === void 0 ? void 0 : options.icon);
    const IconComponent = iconKey ? BADGE_ICONS[iconKey] : null;
    // Combinar clases CSS
    const combinedClassName = [
        options === null || options === void 0 ? void 0 : options.badgeClassName,
        valueConfig === null || valueConfig === void 0 ? void 0 : valueConfig.className,
        options === null || options === void 0 ? void 0 : options.className
    ].filter(Boolean).join(' ');
    // Combinar estilos
    const combinedStyle = Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.style), valueConfig === null || valueConfig === void 0 ? void 0 : valueConfig.style);
    return {
        content: (<Badge variant={variant} className={combinedClassName} style={combinedStyle}>
        {IconComponent && (<IconComponent className={`mr-1 h-3 w-3 ${(options === null || options === void 0 ? void 0 : options.iconClassName) || ''}`}/>)}
        {displayText}
      </Badge>)
    };
};
//# sourceMappingURL=badge-formatter.jsx.map