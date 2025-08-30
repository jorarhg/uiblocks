import { jsx as _jsx } from "react/jsx-runtime";
export const DateFormatter = ({ value, field }) => {
    var _a;
    const options = (_a = field.formatter) === null || _a === void 0 ? void 0 : _a.options;
    if (!value)
        return { content: _jsx("span", { className: "text-muted-foreground", children: "-" }) };
    const date = new Date(value);
    if (isNaN(date.getTime()))
        return { content: _jsx("span", { className: options === null || options === void 0 ? void 0 : options.className, children: value }) };
    let formattedDate;
    const locale = (options === null || options === void 0 ? void 0 : options.locale) || 'es-ES';
    switch (options === null || options === void 0 ? void 0 : options.format) {
        case 'short':
            formattedDate = date.toLocaleDateString(locale);
            break;
        case 'medium':
            formattedDate = date.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
            break;
        case 'long':
            formattedDate = date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
            break;
        case 'relative':
            formattedDate = formatRelativeDate(date);
            break;
        case 'custom':
            formattedDate = formatCustomDate(date, (options === null || options === void 0 ? void 0 : options.customFormat) || 'DD/MM/YYYY');
            break;
        default: formattedDate = date.toISOString().split('T')[0];
    }
    return { content: _jsx("span", { className: options === null || options === void 0 ? void 0 : options.className, title: date.toLocaleString(locale), children: formattedDate }), style: options === null || options === void 0 ? void 0 : options.style };
};
function formatRelativeDate(date) { const now = new Date(); const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)); if (diffInDays === 0)
    return 'Hoy'; if (diffInDays === 1)
    return 'Ayer'; if (diffInDays === -1)
    return 'Mañana'; if (diffInDays > 1 && diffInDays <= 7)
    return `Hace ${diffInDays} días`; if (diffInDays < -1 && diffInDays >= -7)
    return `En ${Math.abs(diffInDays)} días`; return date.toLocaleDateString('es-ES'); }
function formatCustomDate(date, pattern) { const day = date.getDate().toString().padStart(2, '0'); const month = (date.getMonth() + 1).toString().padStart(2, '0'); const year = date.getFullYear().toString(); const shortYear = year.slice(-2); const hours = date.getHours().toString().padStart(2, '0'); const minutes = date.getMinutes().toString().padStart(2, '0'); const seconds = date.getSeconds().toString().padStart(2, '0'); const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']; const monthNamesShort = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']; return pattern.replace(/YYYY/g, year).replace(/YY/g, shortYear).replace(/MMMM/g, monthNames[date.getMonth()]).replace(/MMM/g, monthNamesShort[date.getMonth()]).replace(/MM/g, month).replace(/M/g, (date.getMonth() + 1).toString()).replace(/DD/g, day).replace(/D/g, date.getDate().toString()).replace(/HH/g, hours).replace(/H/g, date.getHours().toString()).replace(/mm/g, minutes).replace(/m/g, date.getMinutes().toString()).replace(/ss/g, seconds).replace(/s/g, date.getSeconds().toString()); }
//# sourceMappingURL=date-formatter.js.map