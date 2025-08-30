import { DefaultFormatter } from './default-formatter';
import { BadgeFormatter } from './badge-formatter';
import { DateFormatter } from './date-formatter';
import { CurrencyFormatter } from './currency-formatter';
import { PercentageFormatter } from './percentage-formatter';
import { IconFormatter } from './icon-formatter';
import { IconTextFormatter } from './icon-text-formatter';
import { CustomFormatter } from './custom-formatter';
import { HtmlFormatter } from './html-formatter';
import { LinkFormatter } from './link-formatter';
import { ImageFormatter } from './image-formatter';
// Registry de formatters disponibles
export const FORMATTERS = {
    default: DefaultFormatter,
    badge: BadgeFormatter,
    date: DateFormatter,
    currency: CurrencyFormatter,
    percentage: PercentageFormatter,
    icon: IconFormatter,
    'icon-text': IconTextFormatter,
    custom: CustomFormatter,
    html: HtmlFormatter,
    link: LinkFormatter,
    image: ImageFormatter,
};
/**
 * Función principal para aplicar formateo a una celda
 */
export function formatCell(context) {
    const { field } = context;
    if (!field.formatter) {
        return DefaultFormatter(context);
    }
    const formatter = FORMATTERS[field.formatter.type];
    if (!formatter) {
        console.warn(`Formatter type '${field.formatter.type}' not found, using default`);
        return DefaultFormatter(context);
    }
    try {
        const result = formatter(context);
        // Aplicar formateo condicional si existe
        const conditionalResult = applyConditionalFormatting(context, result);
        return conditionalResult;
    }
    catch (error) {
        console.error(`Error in formatter '${field.formatter.type}':`, error);
        return DefaultFormatter(context);
    }
}
/**
 * Aplica formateo condicional basado en condiciones
 */
function applyConditionalFormatting(context, baseResult) {
    var _a, _b;
    const { field, value, record } = context;
    const conditionalFormats = ((_b = (_a = field.formatter) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.conditionalFormatting) || field.conditionalFormatting || [];
    if (!conditionalFormats.length) {
        return baseResult;
    }
    // Buscar la primera condición que se cumpla
    for (const format of conditionalFormats) {
        let conditionMet = false;
        if (typeof format.condition === 'function') {
            conditionMet = format.condition(value, record);
        }
        else if (typeof format.condition === 'string') {
            // Evaluar condición como string (ej: "value > 10")
            try {
                conditionMet = evaluateCondition(format.condition, value, record);
            }
            catch (error) {
                console.warn('Error evaluating condition:', format.condition, error);
                continue;
            }
        }
        if (conditionMet) {
            // Si hay un formatter específico, usarlo
            if (format.formatter) {
                const newContext = Object.assign(Object.assign({}, context), { field: Object.assign(Object.assign({}, context.field), { formatter: format.formatter }) });
                return formatCell(newContext);
            }
            // Aplicar solo estilos condicionales
            return Object.assign(Object.assign({}, baseResult), { className: combineClassNames(baseResult.className, format.className), style: Object.assign(Object.assign({}, baseResult.style), format.style) });
        }
    }
    return baseResult;
}
/**
 * Evalúa una condición de string de manera segura
 */
function evaluateCondition(condition, value, record) {
    // Reemplazar 'value' y 'record' en la condición
    const safeCondition = condition
        .replace(/\bvalue\b/g, JSON.stringify(value))
        .replace(/\brecord\.(\w+)\b/g, (_, prop) => JSON.stringify(record[prop]));
    // Solo permitir operadores seguros
    const allowedOperators = /^[\d\s\+\-\*\/\(\)\>\<\=\!\&\|\.\"\'\w]+$/;
    if (!allowedOperators.test(safeCondition)) {
        throw new Error('Unsafe condition');
    }
    // Evaluar usando Function constructor (más seguro que eval)
    return new Function('return ' + safeCondition)();
}
/**
 * Combina nombres de clases CSS
 */
function combineClassNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
/**
 * Aplica template a un valor (ej: "TASK-{value}" con value="123" -> "TASK-123")
 */
export function applyTemplate(template, value, record) {
    if (!template)
        return String(value || '');
    return template
        .replace(/\{value\}/g, String(value || ''))
        .replace(/\{record\.(\w+)\}/g, (_, prop) => String((record === null || record === void 0 ? void 0 : record[prop]) || ''));
}
/**
 * Utilidad para crear un formatter personalizado
 */
export function createCustomFormatter(render) {
    return (context) => ({
        content: render(context)
    });
}
//# sourceMappingURL=index.js.map