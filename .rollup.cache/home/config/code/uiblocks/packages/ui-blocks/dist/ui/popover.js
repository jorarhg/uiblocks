import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '../internal/lib/utils';
export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverContent = React.forwardRef((_a, ref) => {
    var { className, align = 'center', sideOffset = 4 } = _a, props = __rest(_a, ["className", "align", "sideOffset"]);
    return (_jsx(PopoverPrimitive.Portal, { children: _jsx(PopoverPrimitive.Content, Object.assign({ ref: ref, align: align, sideOffset: sideOffset, className: cn('z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out', className) }, props)) }));
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
//# sourceMappingURL=popover.js.map