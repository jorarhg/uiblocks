import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { cn } from '../internal/lib/utils';
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuSubTrigger = React.forwardRef((_a, ref) => {
    var { className, inset, children } = _a, props = __rest(_a, ["className", "inset", "children"]);
    return (_jsxs(DropdownMenuPrimitive.SubTrigger, Object.assign({ ref: ref, className: cn('flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent', inset && 'pl-8', className) }, props, { children: [children, _jsx(ChevronRight, { className: 'ml-auto h-4 w-4' })] })));
});
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
export const DropdownMenuSubContent = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(DropdownMenuPrimitive.SubContent, Object.assign({ ref: ref, className: cn('z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg', className) }, props)));
});
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
export const DropdownMenuContent = React.forwardRef((_a, ref) => {
    var { className, sideOffset = 4 } = _a, props = __rest(_a, ["className", "sideOffset"]);
    return (_jsx(DropdownMenuPrimitive.Portal, { children: _jsx(DropdownMenuPrimitive.Content, Object.assign({ ref: ref, sideOffset: sideOffset, className: cn('z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md', className) }, props)) }));
});
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
export const DropdownMenuItem = React.forwardRef((_a, ref) => {
    var { className, inset } = _a, props = __rest(_a, ["className", "inset"]);
    return (_jsx(DropdownMenuPrimitive.Item, Object.assign({ ref: ref, className: cn('relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50', inset && 'pl-8', className) }, props)));
});
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
export const DropdownMenuCheckboxItem = React.forwardRef((_a, ref) => {
    var { className, children, checked } = _a, props = __rest(_a, ["className", "children", "checked"]);
    return (_jsxs(DropdownMenuPrimitive.CheckboxItem, Object.assign({ ref: ref, className: cn('relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50', className), checked: checked }, props, { children: [_jsx("span", { className: 'absolute left-2 flex h-3.5 w-3.5 items-center justify-center', children: _jsx(DropdownMenuPrimitive.ItemIndicator, { children: _jsx(Check, { className: 'h-4 w-4' }) }) }), children] })));
});
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
export const DropdownMenuRadioItem = React.forwardRef((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (_jsxs(DropdownMenuPrimitive.RadioItem, Object.assign({ ref: ref, className: cn('relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground', className) }, props, { children: [_jsx("span", { className: 'absolute left-2 flex h-3.5 w-3.5 items-center justify-center', children: _jsx(DropdownMenuPrimitive.ItemIndicator, { children: _jsx(Circle, { className: 'h-2 w-2 fill-current' }) }) }), children] })));
});
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
export const DropdownMenuLabel = React.forwardRef((_a, ref) => {
    var { className, inset } = _a, props = __rest(_a, ["className", "inset"]);
    return (_jsx(DropdownMenuPrimitive.Label, Object.assign({ ref: ref, className: cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className) }, props)));
});
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
export const DropdownMenuSeparator = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(DropdownMenuPrimitive.Separator, Object.assign({ ref: ref, className: cn('-mx-1 my-1 h-px bg-muted', className) }, props)));
});
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
export const DropdownMenuShortcut = (_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("span", Object.assign({ className: cn('ml-auto text-xs tracking-widest opacity-60', className) }, props)));
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';
//# sourceMappingURL=dropdown-menu.js.map