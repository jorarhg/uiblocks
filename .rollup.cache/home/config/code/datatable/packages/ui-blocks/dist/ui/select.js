import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../internal/lib/utils';
export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;
export const SelectTrigger = React.forwardRef((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (_jsxs(SelectPrimitive.Trigger, Object.assign({ ref: ref, className: cn('flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm', className) }, props, { children: [children, _jsx(SelectPrimitive.Icon, { asChild: true, children: _jsx(ChevronDown, { className: 'h-4 w-4 opacity-50' }) })] })));
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(SelectPrimitive.ScrollUpButton, Object.assign({ ref: ref, className: cn('flex cursor-default items-center justify-center py-1', className) }, props, { children: _jsx(ChevronUp, { className: 'h-4 w-4' }) })));
});
const SelectScrollDownButton = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(SelectPrimitive.ScrollDownButton, Object.assign({ ref: ref, className: cn('flex cursor-default items-center justify-center py-1', className) }, props, { children: _jsx(ChevronDown, { className: 'h-4 w-4' }) })));
});
export const SelectContent = React.forwardRef((_a, ref) => {
    var { className, children, position = 'popper' } = _a, props = __rest(_a, ["className", "children", "position"]);
    return (_jsx(SelectPrimitive.Portal, { children: _jsxs(SelectPrimitive.Content, Object.assign({ ref: ref, className: cn('relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md', className), position: position }, props, { children: [_jsx(SelectScrollUpButton, {}), _jsx(SelectPrimitive.Viewport, { className: cn('p-1', position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'), children: children }), _jsx(SelectScrollDownButton, {})] })) }));
});
SelectContent.displayName = SelectPrimitive.Content.displayName;
export const SelectLabel = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(SelectPrimitive.Label, Object.assign({ ref: ref, className: cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className) }, props)));
});
SelectLabel.displayName = SelectPrimitive.Label.displayName;
export const SelectItem = React.forwardRef((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (_jsxs(SelectPrimitive.Item, Object.assign({ ref: ref, className: cn('relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground', className) }, props, { children: [_jsx("span", { className: 'absolute left-2 flex h-3.5 w-3.5 items-center justify-center', children: _jsx(SelectPrimitive.ItemIndicator, { children: _jsx(Check, { className: 'h-4 w-4' }) }) }), _jsx(SelectPrimitive.ItemText, { children: children })] })));
});
SelectItem.displayName = SelectPrimitive.Item.displayName;
export const SelectSeparator = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(SelectPrimitive.Separator, Object.assign({ ref: ref, className: cn('-mx-1 my-1 h-px bg-muted', className) }, props)));
});
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
//# sourceMappingURL=select.js.map