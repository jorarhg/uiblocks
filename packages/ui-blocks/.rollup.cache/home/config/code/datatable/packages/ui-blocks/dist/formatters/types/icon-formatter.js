import { jsx as _jsx } from "react/jsx-runtime";
import { CircleIcon, CircleDashedIcon, Clock, CheckCircle, XCircle, AlertCircle, Star, Heart, Zap, User, Mail, Phone, Calendar, Settings, Home, Building, MapPin, Camera, FileText, Download, Upload, Edit, Trash2, Eye, Search, Filter, Plus, Minus } from 'lucide-react';
const ICON_REGISTRY = { 'circle': CircleIcon, 'circle-dashed': CircleDashedIcon, 'clock': Clock, 'check-circle': CheckCircle, 'x-circle': XCircle, 'alert-circle': AlertCircle, 'star': Star, 'heart': Heart, 'zap': Zap, 'user': User, 'mail': Mail, 'phone': Phone, 'calendar': Calendar, 'settings': Settings, 'home': Home, 'building': Building, 'map-pin': MapPin, 'camera': Camera, 'file-text': FileText, 'download': Download, 'upload': Upload, 'edit': Edit, 'trash': Trash2, 'eye': Eye, 'search': Search, 'filter': Filter, 'plus': Plus, 'minus': Minus };
export const IconFormatter = ({ value, field }) => {
    var _a, _b;
    const options = (_a = field.formatter) === null || _a === void 0 ? void 0 : _a.options;
    const valueConfig = (_b = options === null || options === void 0 ? void 0 : options.valueMap) === null || _b === void 0 ? void 0 : _b[value];
    const iconKey = (valueConfig === null || valueConfig === void 0 ? void 0 : valueConfig.icon) || (options === null || options === void 0 ? void 0 : options.icon) || value;
    const IconComponent = ICON_REGISTRY[iconKey];
    if (!IconComponent)
        return { content: _jsx("span", { className: 'text-muted-foreground', children: "-" }) };
    const combinedClassName = ['h-4 w-4', options === null || options === void 0 ? void 0 : options.iconClassName, valueConfig === null || valueConfig === void 0 ? void 0 : valueConfig.className, options === null || options === void 0 ? void 0 : options.className].filter(Boolean).join(' ');
    return { content: _jsx(IconComponent, { className: combinedClassName, style: Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.style), valueConfig === null || valueConfig === void 0 ? void 0 : valueConfig.style) }) };
};
//# sourceMappingURL=icon-formatter.js.map