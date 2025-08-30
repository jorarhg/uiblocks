import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '../internal/lib/utils';
export const Separator = React.forwardRef((_a, ref) => {
    var { className, orientation = 'horizontal', decorative = true } = _a, props = __rest(_a, ["className", "orientation", "decorative"]);
    return (_jsx(SeparatorPrimitive.Root, Object.assign({ ref: ref, decorative: decorative, orientation: orientation, className: cn('shrink-0 bg-border', orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', className) }, props)));
});
Separator.displayName = SeparatorPrimitive.Root.displayName;
//# sourceMappingURL=separator.js.map