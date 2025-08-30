import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../internal/lib/utils';
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;
export const DialogOverlay = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(DialogPrimitive.Overlay, Object.assign({ ref: ref, className: cn('fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0', className) }, props)));
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
export const DialogContent = React.forwardRef((_a, ref) => {
    var { className, children } = _a, props = __rest(_a, ["className", "children"]);
    return (_jsxs(DialogPortal, { children: [_jsx(DialogOverlay, {}), _jsxs(DialogPrimitive.Content, Object.assign({ ref: ref, className: cn('fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out sm:rounded-lg', className) }, props, { children: [children, _jsxs(DialogPrimitive.Close, { className: 'absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', children: [_jsx(X, { className: 'h-4 w-4' }), _jsx("span", { className: 'sr-only', children: "Close" })] })] }))] }));
});
DialogContent.displayName = DialogPrimitive.Content.displayName;
export const DialogHeader = (_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("div", Object.assign({ className: cn('flex flex-col space-y-1.5 text-center sm:text-left', className) }, props)));
};
export const DialogFooter = (_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("div", Object.assign({ className: cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className) }, props)));
};
export const DialogTitle = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(DialogPrimitive.Title, Object.assign({ ref: ref, className: cn('text-lg font-semibold leading-none tracking-tight', className) }, props)));
});
DialogTitle.displayName = DialogPrimitive.Title.displayName;
export const DialogDescription = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx(DialogPrimitive.Description, Object.assign({ ref: ref, className: cn('text-sm text-muted-foreground', className) }, props)));
});
DialogDescription.displayName = DialogPrimitive.Description.displayName;
//# sourceMappingURL=dialog.js.map