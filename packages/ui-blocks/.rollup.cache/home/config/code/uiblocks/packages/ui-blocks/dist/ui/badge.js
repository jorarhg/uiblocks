import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from 'class-variance-authority';
import { cn } from '../internal/lib/utils';
const badgeVariants = cva('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', {
    variants: {
        variant: {
            default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
            secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
            destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
            outline: 'text-foreground'
        }
    },
    defaultVariants: { variant: 'default' }
});
export function Badge(_a) {
    var { className, variant } = _a, props = __rest(_a, ["className", "variant"]);
    return _jsx("div", Object.assign({ className: cn(badgeVariants({ variant }), className) }, props));
}
export { badgeVariants };
//# sourceMappingURL=badge.js.map