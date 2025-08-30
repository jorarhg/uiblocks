export function applyTemplate(template, value, record) {
    if (!template)
        return String(value !== null && value !== void 0 ? value : '');
    return template
        .replace(/\{value\}/g, String(value !== null && value !== void 0 ? value : ''))
        .replace(/\{record\.(\w+)\}/g, (_, prop) => { var _a; return String((_a = record === null || record === void 0 ? void 0 : record[prop]) !== null && _a !== void 0 ? _a : ''); });
}
export function createCustomFormatter(render) {
    return (context) => ({ content: render(context) });
}
export function applyConditionalFormatting(context, baseResult, formatCell) {
    var _a, _b;
    const { field, value, record } = context;
    const conditionalFormats = ((_b = (_a = field.formatter) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.conditionalFormatting) || field.conditionalFormatting || [];
    for (const format of conditionalFormats) {
        let met = false;
        if (typeof format.condition === 'function')
            met = format.condition(value, record);
        else if (typeof format.condition === 'string') {
            try {
                met = evaluateCondition(format.condition, value, record);
            }
            catch (_c) {
                continue;
            }
        }
        if (met) {
            if (format.formatter) {
                const newCtx = Object.assign(Object.assign({}, context), { field: Object.assign(Object.assign({}, context.field), { formatter: format.formatter }) });
                return formatCell(newCtx);
            }
            return Object.assign(Object.assign({}, baseResult), { className: combineClassNames(baseResult.className, format.className), style: Object.assign(Object.assign({}, baseResult.style), format.style) });
        }
    }
    return baseResult;
}
function evaluateCondition(condition, value, record) {
    const safe = condition
        .replace(/\bvalue\b/g, JSON.stringify(value))
        .replace(/\brecord\.(\w+)\b/g, (_, p) => JSON.stringify(record === null || record === void 0 ? void 0 : record[p]));
    const allowed = /^[\d\s\+\-\*\/\(\)\>\<\=\!\&\|\.\"\'\w]+$/;
    if (!allowed.test(safe))
        throw new Error('Unsafe condition');
    // eslint-disable-next-line no-new-func
    return new Function('return ' + safe)();
}
function combineClassNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
//# sourceMappingURL=helpers.js.map