import React from 'react';
import { applyTemplate } from './index';
import { CircleIcon, CircleDashedIcon, Clock, CheckCircle, XCircle, AlertCircle, Star, Heart, Zap, User, Mail, Phone, Calendar, Settings, Home, Building, MapPin, Camera, FileText, Download, Upload, Edit, Trash2, Eye, Search, Filter, Plus, Minus } from 'lucide-react';
// Mismo registry que icon-formatter
const ICON_REGISTRY = {
    'circle': CircleIcon,
    'circle-dashed': CircleDashedIcon,
    'clock': Clock,
    'check-circle': CheckCircle,
    'x-circle': XCircle,
    'alert-circle': AlertCircle,
    'star': Star,
    'heart': Heart,
    'zap': Zap,
    'user': User,
    'mail': Mail,
    'phone': Phone,
    'calendar': Calendar,
    'settings': Settings,
    'home': Home,
    'building': Building,
    'map-pin': MapPin,
    'camera': Camera,
    'file-text': FileText,
    'download': Download,
    'upload': Upload,
    'edit': Edit,
    'trash': Trash2,
    'eye': Eye,
    'search': Search,
    'filter': Filter,
    'plus': Plus,
    'minus': Minus
};
/**
 * Formatter que muestra un icono junto con texto
 */
export const IconTextFormatter = ({ value, field, record }) => {
    var _a, _b;
    const options = (_a = field.formatter) === null || _a === void 0 ? void 0 : _a.options;
    // Buscar configuración específica para este valor
    const valueConfig = (_b = options === null || options === void 0 ? void 0 : options.valueMap) === null || _b === void 0 ? void 0 : _b[value];
    // Determinar el texto a mostrar
    let displayText = (valueConfig === null || valueConfig === void 0 ? void 0 : valueConfig.label) || value;
    if (options === null || options === void 0 ? void 0 : options.template) {
        displayText = applyTemplate(options.template, value, record);
    }
    // Determinar el icono
    const iconKey = (valueConfig === null || valueConfig === void 0 ? void 0 : valueConfig.icon) || (options === null || options === void 0 ? void 0 : options.icon);
    const IconComponent = iconKey ? ICON_REGISTRY[iconKey] : null;
    // Determinar posición del icono
    const iconPosition = (options === null || options === void 0 ? void 0 : options.iconPosition) || 'left';
    // Combinar clases CSS
    const textClassName = [
        valueConfig === null || valueConfig === void 0 ? void 0 : valueConfig.className,
        options === null || options === void 0 ? void 0 : options.className
    ].filter(Boolean).join(' ');
    const iconClassName = [
        'h-4 w-4',
        options === null || options === void 0 ? void 0 : options.iconClassName
    ].filter(Boolean).join(' ');
    const containerClassName = 'flex items-center gap-2';
    return {
        content: (<div className={containerClassName}>
        {IconComponent && iconPosition === 'left' && (<IconComponent className={iconClassName}/>)}
        <span className={textClassName}>
          {displayText}
        </span>
        {IconComponent && iconPosition === 'right' && (<IconComponent className={iconClassName}/>)}
      </div>),
        style: Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.style), valueConfig === null || valueConfig === void 0 ? void 0 : valueConfig.style)
    };
};
//# sourceMappingURL=icon-text-formatter.jsx.map