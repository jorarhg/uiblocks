import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import { cn } from '../internal/lib/utils';
import { Dialog, DialogContent } from './dialog';
export const Command = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive, Object.assign({ ref: ref, className: cn('flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground', className) }, props)));
});
Command.displayName = CommandPrimitive.displayName;
export const CommandDialog = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    return (_jsx(Dialog, Object.assign({}, props, { children: _jsx(DialogContent, { className: 'overflow-hidden p-0 shadow-lg', children: _jsx(Command, { className: '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground', children: children }) }) })));
};
export const CommandInput = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsxs("div", { className: 'flex items-center border-b px-3', "cmdk-input-wrapper": '', children: [_jsx(Search, { className: 'mr-2 h-4 w-4 shrink-0 opacity-50' }), _jsx(CommandPrimitive.Input, Object.assign({ ref: ref, className: cn('flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50', className) }, props))] }));
});
CommandInput.displayName = CommandPrimitive.Input.displayName;
export const CommandList = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive.List, Object.assign({ ref: ref, className: cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className) }, props)));
});
CommandList.displayName = CommandPrimitive.List.displayName;
export const CommandEmpty = React.forwardRef((props, ref) => (_jsx(CommandPrimitive.Empty, Object.assign({ ref: ref, className: 'py-6 text-center text-sm' }, props))));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;
export const CommandGroup = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive.Group, Object.assign({ ref: ref, className: cn('overflow-hidden p-1 text-foreground', className) }, props)));
});
CommandGroup.displayName = CommandPrimitive.Group.displayName;
export const CommandSeparator = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive.Separator, Object.assign({ ref: ref, className: cn('-mx-1 h-px bg-border', className) }, props)));
});
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;
export const CommandItem = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(CommandPrimitive.Item, Object.assign({ ref: ref, className: cn('relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[selected=true]:bg-accent', className) }, props)));
});
CommandItem.displayName = CommandPrimitive.Item.displayName;
export const CommandShortcut = (_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("span", Object.assign({ className: cn('ml-auto text-xs tracking-widest text-muted-foreground', className) }, props)));
};
CommandShortcut.displayName = 'CommandShortcut';
//# sourceMappingURL=command.js.map