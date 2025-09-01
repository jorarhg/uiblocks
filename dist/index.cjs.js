'use strict';

var jsxRuntime = require('react/jsx-runtime');
var classVarianceAuthority = require('class-variance-authority');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var React = require('react');
var DialogPrimitive = require('@radix-ui/react-dialog');
var lucideReact = require('lucide-react');
var PopoverPrimitive = require('@radix-ui/react-popover');
var SeparatorPrimitive = require('@radix-ui/react-separator');
var DropdownMenuPrimitive = require('@radix-ui/react-dropdown-menu');
var SelectPrimitive = require('@radix-ui/react-select');
var cmdk = require('cmdk');
var reactTable = require('@tanstack/react-table');
var RechartsPrimitive = require('recharts');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);
var DialogPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(DialogPrimitive);
var PopoverPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(PopoverPrimitive);
var SeparatorPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(SeparatorPrimitive);
var DropdownMenuPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(DropdownMenuPrimitive);
var SelectPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(SelectPrimitive);
var RechartsPrimitive__namespace = /*#__PURE__*/_interopNamespaceDefault(RechartsPrimitive);

function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}

const badgeVariants = classVarianceAuthority.cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}

// packages/react/compose-refs/src/composeRefs.tsx
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}

// packages/react/slot/src/Slot.tsx
var Slot = React__namespace.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = React__namespace.Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);
  if (slottable) {
    const newElement = slottable.props.children;
    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        if (React__namespace.Children.count(newElement) > 1) return React__namespace.Children.only(null);
        return React__namespace.isValidElement(newElement) ? newElement.props.children : null;
      } else {
        return child;
      }
    });
    return /* @__PURE__ */ jsxRuntime.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: React__namespace.isValidElement(newElement) ? React__namespace.cloneElement(newElement, void 0, newChildren) : null });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
});
Slot.displayName = "Slot";
var SlotClone = React__namespace.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  if (React__namespace.isValidElement(children)) {
    const childrenRef = getElementRef(children);
    return React__namespace.cloneElement(children, {
      ...mergeProps(slotProps, children.props),
      // @ts-ignore
      ref: forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef
    });
  }
  return React__namespace.Children.count(children) > 1 ? React__namespace.Children.only(null) : null;
});
SlotClone.displayName = "SlotClone";
var Slottable = ({ children }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children });
};
function isSlottable(child) {
  return React__namespace.isValidElement(child) && child.type === Slottable;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}

const buttonVariants = classVarianceAuthority.cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  { variants: { variant: { default: "bg-primary text-primary-foreground hover:bg-primary/90", destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90", outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground", secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80", ghost: "hover:bg-accent hover:text-accent-foreground", link: "text-primary underline-offset-4 hover:underline" }, size: { default: "h-10 px-4 py-2", sm: "h-9 rounded-md px-3", lg: "h-11 rounded-md px-8", icon: "h-10 w-10" } }, defaultVariants: { variant: "default", size: "default" } }
);
const Button = React__namespace.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntime.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
});
Button.displayName = "Button";

const Table = React__namespace.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsxRuntime.jsx(
    "table",
    {
      ref,
      className: cn("w-full caption-bottom text-sm", className),
      ...props
    }
  ) });
});
Table.displayName = "Table";
const TableHeader = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "thead",
  {
    ref,
    className: cn("[&_tr]:border-b", className),
    ...props
  }
));
TableHeader.displayName = "TableHeader";
const TableBody = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
const TableFooter = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
const TableHead = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "th",
  {
    ref,
    className: cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "td",
  {
    ref,
    className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";

const Input = React__namespace.forwardRef(({ className, type, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "input",
    {
      type,
      className: cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ref,
      ...props
    }
  );
});
Input.displayName = "Input";

const Dialog = DialogPrimitive__namespace.Root;
const DialogTrigger = DialogPrimitive__namespace.Trigger;
const DialogPortal = DialogPrimitive__namespace.Portal;
const DialogClose = DialogPrimitive__namespace.Close;
const DialogOverlay = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DialogPrimitive__namespace.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive__namespace.Overlay.displayName;
const DialogContent = React__namespace.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntime.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntime.jsxs(
    DialogPrimitive__namespace.Content,
    {
      ref,
      className: cn(
        "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntime.jsxs(DialogPrimitive__namespace.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive__namespace.Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntime.jsx(
  "div",
  {
    className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
    ...props
  }
);
const DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntime.jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
const DialogTitle = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DialogPrimitive__namespace.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive__namespace.Title.displayName;
const DialogDescription = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DialogPrimitive__namespace.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive__namespace.Description.displayName;

const Popover = PopoverPrimitive__namespace.Root;
const PopoverTrigger = PopoverPrimitive__namespace.Trigger;
const PopoverContent = React__namespace.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
  PopoverPrimitive__namespace.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive__namespace.Content.displayName;

const Separator = React__namespace.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  SeparatorPrimitive__namespace.Root,
  {
    ref,
    decorative,
    orientation,
    className: cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
      className
    ),
    ...props
  }
));
Separator.displayName = SeparatorPrimitive__namespace.Root.displayName;

const DropdownMenu = DropdownMenuPrimitive__namespace.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive__namespace.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive__namespace.Group;
const DropdownMenuPortal = DropdownMenuPrimitive__namespace.Portal;
const DropdownMenuSub = DropdownMenuPrimitive__namespace.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive__namespace.RadioGroup;
const DropdownMenuSubTrigger = React__namespace.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(
  DropdownMenuPrimitive__namespace.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive__namespace.SubTrigger.displayName;
const DropdownMenuSubContent = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DropdownMenuPrimitive__namespace.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive__namespace.SubContent.displayName;
const DropdownMenuContent = React__namespace.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
  DropdownMenuPrimitive__namespace.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive__namespace.Content.displayName;
const DropdownMenuItem = React__namespace.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DropdownMenuPrimitive__namespace.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive__namespace.Item.displayName;
const DropdownMenuCheckboxItem = React__namespace.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(
  DropdownMenuPrimitive__namespace.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuPrimitive__namespace.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive__namespace.CheckboxItem.displayName;
const DropdownMenuRadioItem = React__namespace.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(
  DropdownMenuPrimitive__namespace.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuPrimitive__namespace.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive__namespace.RadioItem.displayName;
const DropdownMenuLabel = React__namespace.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DropdownMenuPrimitive__namespace.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive__namespace.Label.displayName;
const DropdownMenuSeparator = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  DropdownMenuPrimitive__namespace.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive__namespace.Separator.displayName;
const DropdownMenuShortcut = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntime.jsx(
  "span",
  {
    className: cn("ml-auto text-xs tracking-widest opacity-60", className),
    ...props
  }
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

const Select = SelectPrimitive__namespace.Root;
const SelectGroup = SelectPrimitive__namespace.Group;
const SelectValue = SelectPrimitive__namespace.Value;
const SelectTrigger = React__namespace.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(
  SelectPrimitive__namespace.Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Icon, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive__namespace.Trigger.displayName;
const SelectScrollUpButton = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  SelectPrimitive__namespace.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronUp, { className: "h-4 w-4" })
  }
));
const SelectScrollDownButton = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  SelectPrimitive__namespace.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { className: "h-4 w-4" })
  }
));
const SelectContent = React__namespace.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsxs(
  SelectPrimitive__namespace.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntime.jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsxRuntime.jsx(
        SelectPrimitive__namespace.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive__namespace.Content.displayName;
const SelectLabel = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  SelectPrimitive__namespace.Label,
  {
    ref,
    className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive__namespace.Label.displayName;
const SelectItem = React__namespace.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(
  SelectPrimitive__namespace.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive__namespace.Item.displayName;
const SelectSeparator = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  SelectPrimitive__namespace.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive__namespace.Separator.displayName;

const Command = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(cmdk.Command, { ref, className: cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className), ...props }));
Command.displayName = cmdk.Command.displayName;
const CommandDialog = ({ children, ...props }) => /* @__PURE__ */ jsxRuntime.jsx(Dialog, { ...props, children: /* @__PURE__ */ jsxRuntime.jsx(DialogContent, { className: "overflow-hidden p-0 shadow-lg", children: /* @__PURE__ */ jsxRuntime.jsx(Command, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", children }) }) });
const CommandInput = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsxRuntime.jsx(cmdk.Command.Input, { ref, className: cn("flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50", className), ...props })
] }));
CommandInput.displayName = cmdk.Command.Input.displayName;
const CommandList = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(cmdk.Command.List, { ref, className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className), ...props }));
CommandList.displayName = cmdk.Command.List.displayName;
const CommandEmpty = React__namespace.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntime.jsx(cmdk.Command.Empty, { ref, className: "py-6 text-center text-sm", ...props }));
CommandEmpty.displayName = cmdk.Command.Empty.displayName;
const CommandGroup = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(cmdk.Command.Group, { ref, className: cn("overflow-hidden p-1 text-foreground", className), ...props }));
CommandGroup.displayName = cmdk.Command.Group.displayName;
const CommandSeparator = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(cmdk.Command.Separator, { ref, className: cn("-mx-1 h-px bg-border", className), ...props }));
CommandSeparator.displayName = cmdk.Command.Separator.displayName;
const CommandItem = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(cmdk.Command.Item, { ref, className: cn("relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[selected=true]:bg-accent", className), ...props }));
CommandItem.displayName = cmdk.Command.Item.displayName;
const CommandShortcut = ({ className, ...props }) => /* @__PURE__ */ jsxRuntime.jsx("span", { className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className), ...props });
CommandShortcut.displayName = "CommandShortcut";

function applyTemplate(template, value, record) {
  if (!template) return String(value != null ? value : "");
  return template.replace(/\{value\}/g, String(value != null ? value : "")).replace(/\{record\.(\w+)\}/g, (_, prop) => {
    var _a;
    return String((_a = record == null ? void 0 : record[prop]) != null ? _a : "");
  });
}
function createCustomFormatter(render) {
  return (context) => ({ content: render(context) });
}
function applyConditionalFormatting(context, baseResult, formatCell) {
  var _a, _b;
  const { field, value, record } = context;
  const conditionalFormats = ((_b = (_a = field.formatter) == null ? void 0 : _a.options) == null ? void 0 : _b.conditionalFormatting) || field.conditionalFormatting || [];
  for (const format of conditionalFormats) {
    let met = false;
    if (typeof format.condition === "function") met = format.condition(value, record);
    else if (typeof format.condition === "string") {
      try {
        met = evaluateCondition(format.condition, value, record);
      } catch {
        continue;
      }
    }
    if (met) {
      if (format.formatter) {
        const newCtx = { ...context, field: { ...context.field, formatter: format.formatter } };
        return formatCell(newCtx);
      }
      return { ...baseResult, className: combineClassNames(baseResult.className, format.className), style: { ...baseResult.style, ...format.style } };
    }
  }
  return baseResult;
}
function evaluateCondition(condition, value, record) {
  const safe = condition.replace(/\bvalue\b/g, JSON.stringify(value)).replace(/\brecord\.(\w+)\b/g, (_, p) => JSON.stringify(record == null ? void 0 : record[p]));
  const allowed = /^[\d\s\+\-\*\/\(\)\>\<\=\!\&\|\.\"\'\w]+$/;
  if (!allowed.test(safe)) throw new Error("Unsafe condition");
  return new Function("return " + safe)();
}
function combineClassNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DefaultFormatter = ({ value, field, record }) => {
  var _a;
  const options = (_a = field.formatter) == null ? void 0 : _a.options;
  let displayValue = value;
  if (options == null ? void 0 : options.template) displayValue = applyTemplate(options.template, value, record);
  else displayValue = (value == null ? void 0 : value.toString()) || "";
  return {
    content: /* @__PURE__ */ jsxRuntime.jsx("span", { className: options == null ? void 0 : options.className, children: displayValue }),
    className: options == null ? void 0 : options.className,
    style: options == null ? void 0 : options.style
  };
};

const BADGE_ICONS = {
  "circle": lucideReact.CircleIcon,
  "circle-dashed": lucideReact.CircleDashedIcon,
  "clock": lucideReact.Clock,
  "check-circle": lucideReact.CheckCircle,
  "x-circle": lucideReact.XCircle,
  "alert-circle": lucideReact.AlertCircle,
  "star": lucideReact.Star,
  "heart": lucideReact.Heart,
  "zap": lucideReact.Zap
};
const BadgeFormatter = ({ value, field, record }) => {
  var _a, _b;
  const options = (_a = field.formatter) == null ? void 0 : _a.options;
  const valueConfig = (_b = options == null ? void 0 : options.valueMap) == null ? void 0 : _b[value];
  const variant = (valueConfig == null ? void 0 : valueConfig.variant) || (options == null ? void 0 : options.variant) || "default";
  let displayText = (valueConfig == null ? void 0 : valueConfig.label) || value;
  if (options == null ? void 0 : options.template) displayText = applyTemplate(options.template, value, record);
  const iconKey = (valueConfig == null ? void 0 : valueConfig.icon) || (options == null ? void 0 : options.icon);
  const IconComponent = iconKey ? BADGE_ICONS[iconKey] : null;
  const combinedClassName = [options == null ? void 0 : options.badgeClassName, valueConfig == null ? void 0 : valueConfig.className, options == null ? void 0 : options.className].filter(Boolean).join(" ");
  const combinedStyle = { ...options == null ? void 0 : options.style, ...valueConfig == null ? void 0 : valueConfig.style };
  return {
    content: /* @__PURE__ */ jsxRuntime.jsxs(Badge, { variant, className: combinedClassName, style: combinedStyle, children: [
      IconComponent && /* @__PURE__ */ jsxRuntime.jsx(IconComponent, { className: `mr-1 h-3 w-3 ${(options == null ? void 0 : options.iconClassName) || ""}` }),
      displayText
    ] })
  };
};

const DateFormatter = ({ value, field }) => {
  var _a;
  const options = (_a = field.formatter) == null ? void 0 : _a.options;
  if (!value) return { content: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "-" }) };
  const date = new Date(value);
  if (isNaN(date.getTime())) return { content: /* @__PURE__ */ jsxRuntime.jsx("span", { className: options == null ? void 0 : options.className, children: value }) };
  let formattedDate;
  const locale = (options == null ? void 0 : options.locale) || "es-ES";
  switch (options == null ? void 0 : options.format) {
    case "short":
      formattedDate = date.toLocaleDateString(locale);
      break;
    case "medium":
      formattedDate = date.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
      break;
    case "long":
      formattedDate = date.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric", weekday: "long" });
      break;
    case "relative":
      formattedDate = formatRelativeDate(date);
      break;
    case "custom":
      formattedDate = formatCustomDate(date, (options == null ? void 0 : options.customFormat) || "DD/MM/YYYY");
      break;
    default:
      formattedDate = date.toISOString().split("T")[0];
  }
  return { content: /* @__PURE__ */ jsxRuntime.jsx("span", { className: options == null ? void 0 : options.className, title: date.toLocaleString(locale), children: formattedDate }), style: options == null ? void 0 : options.style };
};
function formatRelativeDate(date) {
  const now = /* @__PURE__ */ new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1e3 * 60 * 60 * 24));
  if (diffInDays === 0) return "Hoy";
  if (diffInDays === 1) return "Ayer";
  if (diffInDays === -1) return "Ma\xF1ana";
  if (diffInDays > 1 && diffInDays <= 7) return `Hace ${diffInDays} d\xEDas`;
  if (diffInDays < -1 && diffInDays >= -7) return `En ${Math.abs(diffInDays)} d\xEDas`;
  return date.toLocaleDateString("es-ES");
}
function formatCustomDate(date, pattern) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  const shortYear = year.slice(-2);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const monthNamesShort = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  return pattern.replace(/YYYY/g, year).replace(/YY/g, shortYear).replace(/MMMM/g, monthNames[date.getMonth()]).replace(/MMM/g, monthNamesShort[date.getMonth()]).replace(/MM/g, month).replace(/M/g, (date.getMonth() + 1).toString()).replace(/DD/g, day).replace(/D/g, date.getDate().toString()).replace(/HH/g, hours).replace(/H/g, date.getHours().toString()).replace(/mm/g, minutes).replace(/m/g, date.getMinutes().toString()).replace(/ss/g, seconds).replace(/s/g, date.getSeconds().toString());
}

const CurrencyFormatter = ({ value, field }) => {
  var _a, _b;
  const options = (_a = field.formatter) == null ? void 0 : _a.options;
  if (value === null || value === void 0 || isNaN(Number(value))) return { content: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "-" }) };
  const currency = (options == null ? void 0 : options.currency) || "EUR";
  const decimals = (_b = options == null ? void 0 : options.decimals) != null ? _b : 2;
  const locale = (options == null ? void 0 : options.locale) || "es-ES";
  try {
    const formatter = new Intl.NumberFormat(locale, { style: "currency", currency, minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    const formattedValue = formatter.format(Number(value));
    return { content: /* @__PURE__ */ jsxRuntime.jsx("span", { className: options == null ? void 0 : options.className, children: formattedValue }), style: options == null ? void 0 : options.style };
  } catch {
    return { content: /* @__PURE__ */ jsxRuntime.jsxs("span", { className: options == null ? void 0 : options.className, children: [
      Number(value).toFixed(decimals),
      " ",
      currency
    ] }), style: options == null ? void 0 : options.style };
  }
};

const PercentageFormatter = ({ value, field }) => {
  var _a, _b;
  const options = (_a = field.formatter) == null ? void 0 : _a.options;
  if (value === null || value === void 0 || isNaN(Number(value))) return { content: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "-" }) };
  const decimals = (_b = options == null ? void 0 : options.decimals) != null ? _b : 1;
  const suffix = (options == null ? void 0 : options.suffix) || "%";
  let percentageValue = Number(value);
  if (percentageValue <= 1 && percentageValue >= 0) percentageValue *= 100;
  const formattedValue = percentageValue.toFixed(decimals);
  return { content: /* @__PURE__ */ jsxRuntime.jsxs("span", { className: options == null ? void 0 : options.className, children: [
    formattedValue,
    suffix
  ] }), style: options == null ? void 0 : options.style };
};

const ICON_REGISTRY$1 = { "circle": lucideReact.CircleIcon, "circle-dashed": lucideReact.CircleDashedIcon, "clock": lucideReact.Clock, "check-circle": lucideReact.CheckCircle, "x-circle": lucideReact.XCircle, "alert-circle": lucideReact.AlertCircle, "star": lucideReact.Star, "heart": lucideReact.Heart, "zap": lucideReact.Zap, "user": lucideReact.User, "mail": lucideReact.Mail, "phone": lucideReact.Phone, "calendar": lucideReact.Calendar, "settings": lucideReact.Settings, "home": lucideReact.Home, "building": lucideReact.Building, "map-pin": lucideReact.MapPin, "camera": lucideReact.Camera, "file-text": lucideReact.FileText, "download": lucideReact.Download, "upload": lucideReact.Upload, "edit": lucideReact.Edit, "trash": lucideReact.Trash2, "eye": lucideReact.Eye, "search": lucideReact.Search, "filter": lucideReact.Filter, "plus": lucideReact.Plus, "minus": lucideReact.Minus };
const IconFormatter = ({ value, field }) => {
  var _a, _b;
  const options = (_a = field.formatter) == null ? void 0 : _a.options;
  const valueConfig = (_b = options == null ? void 0 : options.valueMap) == null ? void 0 : _b[value];
  const iconKey = (valueConfig == null ? void 0 : valueConfig.icon) || (options == null ? void 0 : options.icon) || value;
  const IconComponent = ICON_REGISTRY$1[iconKey];
  if (!IconComponent) return { content: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "-" }) };
  const combinedClassName = ["h-4 w-4", options == null ? void 0 : options.iconClassName, valueConfig == null ? void 0 : valueConfig.className, options == null ? void 0 : options.className].filter(Boolean).join(" ");
  return { content: /* @__PURE__ */ jsxRuntime.jsx(IconComponent, { className: combinedClassName, style: { ...options == null ? void 0 : options.style, ...valueConfig == null ? void 0 : valueConfig.style } }) };
};

const ICON_REGISTRY = { "circle": lucideReact.CircleIcon, "circle-dashed": lucideReact.CircleDashedIcon, "clock": lucideReact.Clock, "check-circle": lucideReact.CheckCircle, "x-circle": lucideReact.XCircle, "alert-circle": lucideReact.AlertCircle, "star": lucideReact.Star, "heart": lucideReact.Heart, "zap": lucideReact.Zap, "user": lucideReact.User, "mail": lucideReact.Mail, "phone": lucideReact.Phone, "calendar": lucideReact.Calendar, "settings": lucideReact.Settings, "home": lucideReact.Home, "building": lucideReact.Building, "map-pin": lucideReact.MapPin, "camera": lucideReact.Camera, "file-text": lucideReact.FileText, "download": lucideReact.Download, "upload": lucideReact.Upload, "edit": lucideReact.Edit, "trash": lucideReact.Trash2, "eye": lucideReact.Eye, "search": lucideReact.Search, "filter": lucideReact.Filter, "plus": lucideReact.Plus, "minus": lucideReact.Minus };
const IconTextFormatter = ({ value, field, record }) => {
  var _a, _b;
  const options = (_a = field.formatter) == null ? void 0 : _a.options;
  const valueConfig = (_b = options == null ? void 0 : options.valueMap) == null ? void 0 : _b[value];
  let displayText = (valueConfig == null ? void 0 : valueConfig.label) || value;
  if (options == null ? void 0 : options.template) displayText = applyTemplate(options.template, value, record);
  const iconKey = (valueConfig == null ? void 0 : valueConfig.icon) || (options == null ? void 0 : options.icon);
  const IconComponent = iconKey ? ICON_REGISTRY[iconKey] : null;
  const iconPosition = (options == null ? void 0 : options.iconPosition) || "left";
  const textClassName = [valueConfig == null ? void 0 : valueConfig.className, options == null ? void 0 : options.className].filter(Boolean).join(" ");
  const iconClassName = ["h-4 w-4", options == null ? void 0 : options.iconClassName].filter(Boolean).join(" ");
  return { content: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
    IconComponent && iconPosition === "left" && /* @__PURE__ */ jsxRuntime.jsx(IconComponent, { className: iconClassName }),
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: textClassName, children: displayText }),
    IconComponent && iconPosition === "right" && /* @__PURE__ */ jsxRuntime.jsx(IconComponent, { className: iconClassName })
  ] }), style: { ...options == null ? void 0 : options.style, ...valueConfig == null ? void 0 : valueConfig.style } };
};

const CustomFormatter = ({ value, field, record }) => {
  var _a;
  const options = (_a = field.formatter) == null ? void 0 : _a.options;
  if (options == null ? void 0 : options.template) {
    const processedValue = applyTemplate(options.template, value, record);
    return { content: /* @__PURE__ */ jsxRuntime.jsx("span", { className: options == null ? void 0 : options.className, style: options == null ? void 0 : options.style, children: processedValue }) };
  }
  return { content: /* @__PURE__ */ jsxRuntime.jsx("span", { className: options == null ? void 0 : options.className, style: options == null ? void 0 : options.style, children: String(value || "") }) };
};

const HtmlFormatter = ({ value, field, record }) => {
  var _a;
  const options = (_a = field.formatter) == null ? void 0 : _a.options;
  let htmlContent = String(value || "");
  if (options == null ? void 0 : options.template) htmlContent = applyTemplate(options.template, value, record);
  return { content: /* @__PURE__ */ jsxRuntime.jsx("div", { className: options == null ? void 0 : options.className, style: options == null ? void 0 : options.style, dangerouslySetInnerHTML: { __html: htmlContent } }) };
};

const LinkFormatter = ({ value, field, record }) => {
  var _a;
  const options = (_a = field.formatter) == null ? void 0 : _a.options;
  if (!value) return { content: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "-" }) };
  let href;
  if (typeof (options == null ? void 0 : options.href) === "function") href = options.href(value, record);
  else if (options == null ? void 0 : options.href) href = applyTemplate(options.href, value, record);
  else href = String(value);
  let displayText = value;
  if (options == null ? void 0 : options.template) displayText = applyTemplate(options.template, value, record);
  const target = (options == null ? void 0 : options.target) || "_self";
  return { content: /* @__PURE__ */ jsxRuntime.jsx("a", { href, target, rel: target === "_blank" ? "noopener noreferrer" : void 0, className: `hover:underline ${(options == null ? void 0 : options.linkClassName) || "text-blue-600"} ${(options == null ? void 0 : options.className) || ""}`, style: options == null ? void 0 : options.style, children: displayText }) };
};

const ImageFormatter = ({ value, field }) => {
  var _a;
  const options = (_a = field.formatter) == null ? void 0 : _a.options;
  if (!value) return { content: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: "-" }) };
  const width = (options == null ? void 0 : options.width) || 32;
  const height = (options == null ? void 0 : options.height) || 32;
  const alt = (options == null ? void 0 : options.alt) || "Image";
  const fallbackSrc = (options == null ? void 0 : options.fallbackSrc) || "/placeholder.svg";
  return { content: /* @__PURE__ */ jsxRuntime.jsx("img", { src: String(value), alt, width, height, className: `rounded ${(options == null ? void 0 : options.className) || ""}`, style: options == null ? void 0 : options.style, onError: (e) => {
    const t = e.target;
    if (t.src !== fallbackSrc) t.src = fallbackSrc;
  } }) };
};

const FORMATTERS = {
  default: DefaultFormatter,
  badge: BadgeFormatter,
  date: DateFormatter,
  currency: CurrencyFormatter,
  percentage: PercentageFormatter,
  icon: IconFormatter,
  "icon-text": IconTextFormatter,
  custom: CustomFormatter,
  html: HtmlFormatter,
  link: LinkFormatter,
  image: ImageFormatter
};
function formatCell(context) {
  const { field } = context;
  if (!field.formatter) return DefaultFormatter(context);
  const formatter = FORMATTERS[field.formatter.type];
  if (!formatter) {
    console.warn(`Formatter type '${field.formatter.type}' not found, using default`);
    return DefaultFormatter(context);
  }
  try {
    const result = formatter(context);
    return applyConditionalFormatting(context, result, formatCell);
  } catch (e) {
    console.error(`Error in formatter '${field.formatter.type}':`, e);
    return DefaultFormatter(context);
  }
}

function DataTableViewOptions({ table }) {
  const columns = table.getAllColumns().filter((col) => col.getCanHide());
  return /* @__PURE__ */ jsxRuntime.jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(Button, { variant: "outline", size: "sm", className: "h-8 w-8 p-0", children: [
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Settings, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "View options" })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(DropdownMenuContent, { align: "end", className: "w-44", children: [
      /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuLabel, { className: "text-xs", children: "Toggle columns" }),
      /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuSeparator, {}),
      columns.map((column) => /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuCheckboxItem, { checked: column.getIsVisible(), onCheckedChange: (value) => column.toggleVisibility(!!value), className: "capitalize", children: column.id }, column.id))
    ] })
  ] });
}

function DataTableFacetedFilter({ column, title, options }) {
  const selectedValues = new Set(column == null ? void 0 : column.getFilterValue());
  return /* @__PURE__ */ jsxRuntime.jsxs(Popover, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(Button, { variant: "outline", size: "sm", className: "h-8 border-dashed", children: [
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ListFilter, { className: "mr-2 h-4 w-4" }),
      title,
      (selectedValues == null ? void 0 : selectedValues.size) > 0 && /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: "secondary", className: "ml-2 rounded-sm px-1 font-normal", children: selectedValues.size })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(PopoverContent, { className: "w-56 p-2", align: "start", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-1 max-h-60 overflow-auto", children: [
      options.map((option) => {
        const isSelected = selectedValues.has(option.value);
        return /* @__PURE__ */ jsxRuntime.jsxs("button", { onClick: () => {
          if (isSelected) selectedValues.delete(option.value);
          else selectedValues.add(option.value);
          const next = Array.from(selectedValues);
          column == null ? void 0 : column.setFilterValue(next.length ? next : void 0);
        }, className: cn("flex items-center gap-2 rounded px-2 py-1 text-left text-xs hover:bg-accent", isSelected && "bg-accent"), children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: cn("flex h-4 w-4 items-center justify-center rounded-sm border border-primary", isSelected ? "bg-primary text-primary-foreground" : "opacity-50"), children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CheckIcon, { className: "h-3 w-3" }) }),
          option.icon && /* @__PURE__ */ jsxRuntime.jsx(option.icon, { className: "h-3.5 w-3.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex-1", children: option.label }),
          option.count !== void 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ml-auto font-mono text-[10px]", children: option.count })
        ] }, option.value);
      }),
      selectedValues.size > 0 && /* @__PURE__ */ jsxRuntime.jsx("button", { onClick: () => column == null ? void 0 : column.setFilterValue(void 0), className: "mt-1 rounded bg-muted px-2 py-1 text-xs", children: "Clear filters" })
    ] }) })
  ] });
}

function DataTableToolbar({ table, searchKey = "title", searchPlaceholder = "Filter rows...", filters = [], className, enableGrouping = false, grouping = [], setGrouping, groupableColumns }) {
  var _a, _b;
  const isFiltered = table.getState().columnFilters.length > 0;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("flex flex-col gap-4 sm:flex-row sm:items-center py-4", className), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative w-full sm:max-w-xs", children: [
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntime.jsx(Input, { placeholder: searchPlaceholder, value: (_b = (_a = table.getColumn(searchKey)) == null ? void 0 : _a.getFilterValue()) != null ? _b : "", onChange: (e) => {
        var _a2;
        return (_a2 = table.getColumn(searchKey)) == null ? void 0 : _a2.setFilterValue(e.target.value);
      }, className: "w-full pl-8" })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-2 ml-auto", children: [
      filters.map((filter) => {
        const column = table.getColumn(filter.columnId);
        if (!column) return null;
        return /* @__PURE__ */ jsxRuntime.jsx(DataTableFacetedFilter, { column, title: filter.title, options: filter.options }, filter.columnId);
      }),
      enableGrouping && groupableColumns && groupableColumns.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center gap-1", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex gap-1", children: groupableColumns.map((id) => {
        const col = table.getColumn(id);
        if (!col) return null;
        const isActive = grouping.includes(id);
        return /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: isActive ? "default" : "outline", size: "sm", className: "h-8 px-2 text-xs", onClick: () => {
          if (!setGrouping) return;
          const next = isActive ? grouping.filter((g) => g !== id) : [...grouping, id];
          setGrouping(next);
          col.toggleGrouping();
        }, children: col.id }, id);
      }) }) }),
      isFiltered && /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "ghost", onClick: () => table.resetColumnFilters(), className: "h-8 px-2 lg:px-3", children: "Reset" }),
      /* @__PURE__ */ jsxRuntime.jsx(DataTableViewOptions, { table })
    ] }),
    enableGrouping && grouping.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-wrap gap-2 -mb-2", children: grouping.map((g) => /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs", children: [
      g,
      /* @__PURE__ */ jsxRuntime.jsx("button", { onClick: () => {
        if (!setGrouping) return;
        const next = grouping.filter((x) => x !== g);
        setGrouping(next);
        const col = table.getColumn(g);
        if (col) {
          col.toggleGrouping();
        }
      }, className: "text-muted-foreground hover:text-foreground", children: "\xD7" })
    ] }, g)) })
  ] });
}

function DataTablePagination({ table }) {
  const pageSize = table.getState().pagination.pageSize;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between px-2", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm font-medium", children: "Rows" }),
      /* @__PURE__ */ jsxRuntime.jsxs(Select, { value: String(pageSize), onValueChange: (val) => table.setPageSize(Number(val)), children: [
        /* @__PURE__ */ jsxRuntime.jsx(SelectTrigger, { className: "h-8 w-[80px]", children: /* @__PURE__ */ jsxRuntime.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntime.jsx(SelectContent, { children: [5, 10, 20, 30, 40, 50].map((ps) => /* @__PURE__ */ jsxRuntime.jsx(SelectItem, { value: String(ps), children: ps }, ps)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1 text-sm text-muted-foreground hidden lg:block pl-3", children: [
      table.getFilteredSelectedRowModel().rows.length,
      " of ",
      table.getFilteredRowModel().rows.length,
      " selected."
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-6 lg:space-x-8", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex w-[100px] items-center justify-center text-sm font-medium", children: [
        "Page ",
        table.getState().pagination.pageIndex + 1,
        " of ",
        table.getPageCount()
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(Button, { variant: "outline", className: "hidden h-8 w-8 p-0 lg:flex", onClick: () => table.setPageIndex(0), disabled: !table.getCanPreviousPage(), children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "First" }),
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronsLeft, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(Button, { variant: "outline", className: "h-8 w-8 p-0", onClick: () => table.previousPage(), disabled: !table.getCanPreviousPage(), children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Prev" }),
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronLeft, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(Button, { variant: "outline", className: "h-8 w-8 p-0", onClick: () => table.nextPage(), disabled: !table.getCanNextPage(), children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Next" }),
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(Button, { variant: "outline", className: "hidden h-8 w-8 p-0 lg:flex", onClick: () => table.setPageIndex(table.getPageCount() - 1), disabled: !table.getCanNextPage(), children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Last" }),
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronsRight, { className: "h-4 w-4" })
        ] })
      ] })
    ] })
  ] });
}

const DEFAULT_COLUMN_FLIP_TRANSITION = "transform 220ms cubic-bezier(.22,.61,.36,1)";
function DataTable({
  columns,
  data,
  searchKey = "title",
  searchPlaceholder,
  filters,
  enableColumnReorder = false,
  enableGrouping = false,
  groupableColumns,
  reorderTransition
}) {
  var _a;
  const [rowSelection, setRowSelection] = React__namespace.useState({});
  const [columnVisibility, setColumnVisibility] = React__namespace.useState({});
  const [columnFilters, setColumnFilters] = React__namespace.useState([]);
  const [sorting, setSorting] = React__namespace.useState([]);
  const [columnOrder, setColumnOrder] = React__namespace.useState([]);
  const [grouping, setGrouping] = React__namespace.useState([]);
  const headerContainerRef = React__namespace.useRef(null);
  const dragSourceIdRef = React__namespace.useRef(null);
  const initialLayoutRef = React__namespace.useRef(null);
  const lastPreviewTargetRef = React__namespace.useRef(null);
  const isMountedRef = React__namespace.useRef(false);
  const pendingRafRef = React__namespace.useRef(null);
  const rafTargetRef = React__namespace.useRef(null);
  const keyboardSourceIdRef = React__namespace.useRef(null);
  const keyboardTargetIdRef = React__namespace.useRef(null);
  const focusAfterReorderRef = React__namespace.useRef(null);
  const flipTransition = reorderTransition || DEFAULT_COLUMN_FLIP_TRANSITION;
  function clearPreviewTransforms() {
    var _a2;
    if (!headerContainerRef.current) return;
    (_a2 = headerContainerRef.current.querySelectorAll("[data-col-id]")) == null ? void 0 : _a2.forEach((el) => {
      el.style.transform = "";
      el.style.transition = "";
      delete el.dataset.flipInit;
    });
  }
  function scheduleFocusGrip(columnId) {
    focusAfterReorderRef.current = columnId;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!headerContainerRef.current) return;
        const grip = headerContainerRef.current.querySelector(`[data-grip-for="${columnId}"]`);
        if (grip) {
          grip.focus({ preventScroll: true });
          focusAfterReorderRef.current = null;
        }
      });
    });
  }
  function captureInitialLayout() {
    if (!headerContainerRef.current) return;
    const cells = Array.from(headerContainerRef.current.querySelectorAll("[data-col-id]"));
    if (!cells.length) return;
    const widths = {};
    const lefts = {};
    let baseLeft = Infinity;
    cells.forEach((el) => {
      const id = el.dataset.colId;
      const rect = el.getBoundingClientRect();
      widths[id] = rect.width;
      lefts[id] = rect.left;
      if (rect.left < baseLeft) baseLeft = rect.left;
    });
    initialLayoutRef.current = { baseLeft, widths, lefts };
  }
  function applyPreview(targetId) {
    var _a2;
    if (!enableColumnReorder) return;
    const sourceId = dragSourceIdRef.current;
    if (!sourceId) {
      clearPreviewTransforms();
      return;
    }
    if (targetId === lastPreviewTargetRef.current) return;
    if (sourceId === targetId) {
      lastPreviewTargetRef.current = targetId;
      clearPreviewTransforms();
      return;
    }
    const layout = initialLayoutRef.current;
    if (!layout) return;
    const currentOrder = columnOrder.length ? columnOrder : table.getAllLeafColumns().map((c) => c.id);
    const next = [...currentOrder];
    const from = next.indexOf(sourceId);
    const to = next.indexOf(targetId);
    if (from === -1 || to === -1) return;
    next.splice(from, 1);
    next.splice(to, 0, sourceId);
    let accLeft = layout.baseLeft;
    const targetLeftMap = {};
    next.forEach((id) => {
      targetLeftMap[id] = accLeft;
      accLeft += layout.widths[id];
    });
    if (!headerContainerRef.current) return;
    (_a2 = headerContainerRef.current.querySelectorAll("[data-col-id]")) == null ? void 0 : _a2.forEach((el) => {
      const node = el;
      const id = node.dataset.colId;
      const currentLeft = layout.lefts[id];
      const targetLeft = targetLeftMap[id];
      if (currentLeft == null || targetLeft == null) return;
      const dx = targetLeft - currentLeft;
      const desired = `translateX(${dx}px)`;
      if (node.style.transform === desired) return;
      if (!node.dataset.flipInit) {
        node.style.willChange = "transform";
        node.dataset.flipInit = "1";
      }
      node.style.transition = flipTransition;
      node.style.transform = desired;
    });
    lastPreviewTargetRef.current = targetId;
  }
  function schedulePreview(targetId) {
    if (pendingRafRef.current) {
      rafTargetRef.current = targetId;
      return;
    }
    rafTargetRef.current = targetId;
    pendingRafRef.current = requestAnimationFrame(() => {
      const t = rafTargetRef.current;
      if (t) applyPreview(t);
      pendingRafRef.current = null;
    });
  }
  function commitReorder(sourceId, targetId) {
    if (sourceId === targetId) return;
    setColumnOrder((prev) => {
      const current = prev.length ? prev : table.getAllLeafColumns().map((c) => c.id);
      const next = [...current];
      const from = next.indexOf(sourceId);
      const to = next.indexOf(targetId);
      if (from === -1 || to === -1) return current;
      next.splice(from, 1);
      next.splice(to, 0, sourceId);
      scheduleFocusGrip(sourceId);
      return next;
    });
  }
  React__namespace.useEffect(() => {
    return () => {
      clearPreviewTransforms();
    };
  }, []);
  React__namespace.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  React__namespace.useEffect(() => {
    if (columnOrder.length === 0) {
      setColumnOrder(
        columns.map((c) => {
          var _a2;
          return (_a2 = c.id) != null ? _a2 : c.accessorKey;
        }).filter(Boolean)
      );
    }
  }, [columns]);
  const table = reactTable.useReactTable({
    data,
    columns,
    state: { sorting, columnVisibility, rowSelection, columnFilters, columnOrder, grouping },
    enableRowSelection: true,
    enableGrouping,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onGroupingChange: setGrouping,
    getCoreRowModel: reactTable.getCoreRowModel(),
    getFilteredRowModel: reactTable.getFilteredRowModel(),
    getPaginationRowModel: reactTable.getPaginationRowModel(),
    getSortedRowModel: reactTable.getSortedRowModel(),
    getFacetedRowModel: reactTable.getFacetedRowModel(),
    getFacetedUniqueValues: reactTable.getFacetedUniqueValues(),
    ...enableGrouping ? { getGroupedRowModel: reactTable.getGroupedRowModel(), getExpandedRowModel: reactTable.getExpandedRowModel() } : {}
  });
  function handleHeaderDrop(e, targetId) {
    if (!enableColumnReorder) return;
    e.preventDefault();
    const sourceId = e.dataTransfer.getData("text/plain");
    clearPreviewTransforms();
    dragSourceIdRef.current = null;
    initialLayoutRef.current = null;
    lastPreviewTargetRef.current = null;
    if (!sourceId) return;
    if (sourceId === targetId && lastPreviewTargetRef.current && lastPreviewTargetRef.current !== sourceId) {
      targetId = lastPreviewTargetRef.current;
    }
    if (sourceId === targetId) return;
    if (!isMountedRef.current) return;
    setColumnOrder((prev) => {
      const current = prev.length ? prev : table.getAllLeafColumns().map((c) => c.id);
      const next = [...current];
      const from = next.indexOf(sourceId);
      const to = next.indexOf(targetId);
      if (from === -1 || to === -1) return current;
      next.splice(from, 1);
      next.splice(to, 0, sourceId);
      scheduleFocusGrip(sourceId);
      return next;
    });
  }
  function renderCell(row, cell) {
    var _a2;
    if (enableGrouping) {
      if (cell.getIsGrouped()) {
        return /* @__PURE__ */ jsxRuntime.jsxs(
          "button",
          {
            onClick: row.getToggleExpandedHandler(),
            className: "flex items-center gap-2 font-medium",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "inline-block w-4", children: row.getIsExpanded() ? "\u2212" : "+" }),
              reactTable.flexRender(cell.column.columnDef.cell, cell.getContext()),
              /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "(",
                row.subRows.length,
                ")"
              ] })
            ]
          }
        );
      }
      if (cell.getIsAggregated()) {
        return reactTable.flexRender(
          (_a2 = cell.column.columnDef.aggregatedCell) != null ? _a2 : cell.column.columnDef.cell,
          cell.getContext()
        );
      }
      if (cell.getIsPlaceholder()) return null;
    }
    return reactTable.flexRender(cell.column.columnDef.cell, cell.getContext());
  }
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      DataTableToolbar,
      {
        table,
        searchKey,
        searchPlaceholder,
        filters,
        enableGrouping,
        grouping,
        setGrouping,
        groupableColumns
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntime.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(TableHeader, { ref: headerContainerRef, children: table.getHeaderGroups().map((hg) => /* @__PURE__ */ jsxRuntime.jsx(TableRow, { children: hg.headers.map((header) => {
        var _a2, _b;
        const id = header.column.id;
        const canReorder = enableColumnReorder && header.column.getCanHide() && !((_b = (_a2 = header.column.columnDef) == null ? void 0 : _a2.meta) == null ? void 0 : _b.disableReorder);
        return /* @__PURE__ */ jsxRuntime.jsxs(
          TableHead,
          {
            "data-col-id": id,
            onDragOver: (e) => {
              if (enableColumnReorder && dragSourceIdRef.current) {
                e.preventDefault();
                if (dragSourceIdRef.current !== id && lastPreviewTargetRef.current !== id) {
                  schedulePreview(id);
                }
              }
            },
            onDragEnter: (e) => {
              if (enableColumnReorder && dragSourceIdRef.current && dragSourceIdRef.current !== id) {
                schedulePreview(id);
              }
            },
            onDrop: (e) => handleHeaderDrop(e, id),
            className: canReorder ? "relative select-none" : void 0,
            children: [
              canReorder && /* @__PURE__ */ jsxRuntime.jsx(
                "span",
                {
                  className: "absolute left-1 top-1/2 -translate-y-1/2 inline-flex items-center p-0.5 rounded hover:bg-muted",
                  draggable: true,
                  "data-grip-for": id,
                  onDragStart: (e) => {
                    if (!canReorder) return;
                    dragSourceIdRef.current = id;
                    keyboardSourceIdRef.current = id;
                    e.dataTransfer.effectAllowed = "move";
                    e.dataTransfer.setData("text/plain", id);
                    captureInitialLayout();
                  },
                  onDragEnd: () => {
                    clearPreviewTransforms();
                    dragSourceIdRef.current = null;
                    initialLayoutRef.current = null;
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.cursor = "move";
                  },
                  onFocus: (e) => {
                    e.currentTarget.style.cursor = "move";
                    keyboardSourceIdRef.current = id;
                  },
                  tabIndex: 0,
                  role: "button",
                  "aria-label": "Reordenar columna",
                  onKeyDown: (e) => {
                    if (!enableColumnReorder) return;
                    const sourceId = keyboardSourceIdRef.current || id;
                    const order = columnOrder.length ? columnOrder : table.getAllLeafColumns().map((c) => c.id);
                    const reorderable = order.filter((colId) => {
                      var _a3, _b2;
                      const col = table.getAllLeafColumns().find((c) => c.id === colId);
                      return col && col.getCanHide() && !((_b2 = (_a3 = col.columnDef) == null ? void 0 : _a3.meta) == null ? void 0 : _b2.disableReorder);
                    });
                    const currentIndex = reorderable.indexOf(sourceId);
                    if (e.key === "ArrowRight") {
                      e.preventDefault();
                      if (currentIndex > -1 && currentIndex < reorderable.length - 1) {
                        const target = reorderable[currentIndex + 1];
                        dragSourceIdRef.current = sourceId;
                        captureInitialLayout();
                        schedulePreview(target);
                        keyboardTargetIdRef.current = target;
                      }
                    } else if (e.key === "ArrowLeft") {
                      e.preventDefault();
                      if (currentIndex > 0) {
                        const target = reorderable[currentIndex - 1];
                        dragSourceIdRef.current = sourceId;
                        captureInitialLayout();
                        schedulePreview(target);
                        keyboardTargetIdRef.current = target;
                      }
                    } else if (e.key === "Enter" || e.key === " ") {
                      if (keyboardTargetIdRef.current) {
                        e.preventDefault();
                        commitReorder(sourceId, keyboardTargetIdRef.current);
                        clearPreviewTransforms();
                        dragSourceIdRef.current = null;
                        keyboardSourceIdRef.current = null;
                        keyboardTargetIdRef.current = null;
                      }
                    } else if (e.key === "Escape") {
                      clearPreviewTransforms();
                      keyboardTargetIdRef.current = null;
                      dragSourceIdRef.current = null;
                    }
                  },
                  children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.GripVertical, { className: "h-3 w-3 opacity-60" })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: canReorder ? "pl-4" : void 0, children: header.isPlaceholder ? null : reactTable.flexRender(
                header.column.columnDef.header,
                header.getContext()
              ) })
            ]
          },
          header.id
        );
      }) }, hg.id)) }),
      /* @__PURE__ */ jsxRuntime.jsx(TableBody, { children: ((_a = table.getRowModel().rows) == null ? void 0 : _a.length) ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsxRuntime.jsx(
        TableRow,
        {
          "data-state": row.getIsSelected() && "selected",
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsxRuntime.jsx(TableCell, { children: renderCell(row, cell) }, cell.id))
        },
        row.id
      )) : /* @__PURE__ */ jsxRuntime.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntime.jsx(TableCell, { colSpan: columns.length, className: "h-24 text-center", children: "No results." }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(DataTablePagination, { table })
  ] });
}

const defaultActions = {
  view: (onView) => ({ id: "view", label: "Ver detalles", icon: lucideReact.Eye, onClick: onView }),
  edit: (onEdit) => ({ id: "edit", label: "Editar", icon: lucideReact.Edit, onClick: onEdit }),
  copy: (onCopy) => ({ id: "copy", label: "Duplicar", icon: lucideReact.Copy, onClick: onCopy }),
  archive: (onArchive) => ({ id: "archive", label: "Archivar", icon: lucideReact.Archive, onClick: onArchive }),
  delete: (onDelete) => ({ id: "delete", label: "Eliminar", icon: lucideReact.Trash2, onClick: onDelete, variant: "destructive" })
};
function ActionsMenu({ row, actions = [], menuLabel = "Acciones" }) {
  if (!actions.length) return null;
  return /* @__PURE__ */ jsxRuntime.jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(Button, { variant: "ghost", className: "h-8 w-8 p-0", children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Abrir men\xFA" }),
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.MoreHorizontal, { className: "h-4 w-4" })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(DropdownMenuContent, { align: "end", className: "w-[160px]", children: [
      /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuLabel, { children: menuLabel }),
      /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuSeparator, {}),
      actions.map((action) => {
        const isDisabled = typeof action.disabled === "function" ? action.disabled(row) : action.disabled;
        return /* @__PURE__ */ jsxRuntime.jsxs(DropdownMenuItem, { onClick: () => !isDisabled && action.onClick(row), disabled: isDisabled, className: action.variant === "destructive" ? "text-destructive focus:text-destructive" : "", children: [
          /* @__PURE__ */ jsxRuntime.jsx(action.icon, { className: "mr-2 h-4 w-4" }),
          action.label
        ] }, action.id);
      })
    ] })
  ] });
}

function createActionsColumn(options) {
  return {
    id: options.id || "actions",
    enableHiding: false,
    enableSorting: false,
    enableColumnFilter: false,
    header: () => null,
    size: options.width || 50,
    cell: ({ row }) => /* @__PURE__ */ jsxRuntime.jsx(ActionsMenu, { row: row.original, actions: options.actions, menuLabel: options.menuLabel })
  };
}
const defaultActionsColumnConfig = { id: "actions", width: 50, menuLabel: "Acciones" };

function CommandPaletteExample() {
  const [open, setOpen] = React__namespace.useState(false);
  React__namespace.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(Button, { variant: "outline", onClick: () => setOpen(true), className: "gap-2", children: [
      "\u2318K ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs opacity-70", children: "(o Ctrl+K)" })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(CommandDialog, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsxRuntime.jsx(CommandInput, { placeholder: "Buscar comando..." }),
      /* @__PURE__ */ jsxRuntime.jsxs(CommandList, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(CommandEmpty, { children: "Sin resultados." }),
        /* @__PURE__ */ jsxRuntime.jsxs(CommandGroup, { heading: "Navegaci\xF3n", children: [
          /* @__PURE__ */ jsxRuntime.jsx(CommandItem, { onSelect: () => alert("Ir a inicio"), children: "Inicio" }),
          /* @__PURE__ */ jsxRuntime.jsx(CommandItem, { onSelect: () => alert("Ir a reportes"), children: "Reportes" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(CommandSeparator, {}),
        /* @__PURE__ */ jsxRuntime.jsxs(CommandGroup, { heading: "Acciones", children: [
          /* @__PURE__ */ jsxRuntime.jsx(CommandItem, { onSelect: () => alert("Crear registro"), children: "Crear registro" }),
          /* @__PURE__ */ jsxRuntime.jsx(CommandItem, { onSelect: () => alert("Exportar"), children: "Exportar" })
        ] })
      ] })
    ] })
  ] });
}

const CHART_VIBRANT_PALETTE = [
  "hsl(210 90% 55%)",
  // azul
  "hsl(280 85% 60%)",
  // violeta
  "hsl(340 80% 55%)",
  // magenta/rosa
  "hsl(20 90% 55%)",
  // naranja
  "hsl(145 70% 45%)",
  // verde
  "hsl(50 95% 55%)",
  // amarillo
  "hsl(185 75% 50%)",
  // cian
  "hsl(315 70% 55%)",
  // fucsia
  "hsl(0 85% 55%)",
  // rojo
  "hsl(95 60% 45%)",
  // lima
  "hsl(255 75% 60%)",
  // índigo
  "hsl(30 80% 50%)"
  // ámbar
];
function chartColor(index) {
  return CHART_VIBRANT_PALETTE[index % CHART_VIBRANT_PALETTE.length];
}

const THEMES = { light: "", dark: ".dark" };
const ChartContext = React__namespace.createContext(null);
function useChart() {
  const c = React__namespace.useContext(ChartContext);
  if (!c) throw new Error("useChart must be used within a <ChartContainer />");
  return c;
}
const ChartContainer = React__namespace.forwardRef(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React__namespace.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  return /* @__PURE__ */ jsxRuntime.jsx(ChartContext.Provider, { value: { config }, children: /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      "data-chart": chartId,
      ref,
      role: "img",
      "aria-label": props["aria-label"] || "Chart visualization",
      className: cn("flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke=#ccc]]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke=#fff]]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke=#ccc]]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke=#ccc]]:stroke-border [&_.recharts-sector[stroke=#fff]]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(ChartStyle, { id: chartId, config }),
        /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive__namespace.ResponsiveContainer, { children })
      ]
    }
  ) });
});
ChartContainer.displayName = "Chart";
const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(([, c]) => c.theme || c.color);
  if (!colorConfig.length) return null;
  return /* @__PURE__ */ jsxRuntime.jsx("style", { dangerouslySetInnerHTML: { __html: Object.entries(THEMES).map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, cfg]) => {
    var _a;
    const color = ((_a = cfg.theme) == null ? void 0 : _a[theme]) || cfg.color;
    return color ? `  --color-${key}: ${color};` : null;
  }).join("\n")}
}`).join("\n") } });
};
const ChartTooltip = RechartsPrimitive__namespace.Tooltip;
const ChartTooltipContent = React__namespace.forwardRef(
  ({ active, payload, className, indicator = "dot", hideLabel = false, hideIndicator = false, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey }, ref) => {
    const { config } = useChart();
    const tooltipLabel = React__namespace.useMemo(() => {
      var _a;
      if (hideLabel || !(payload == null ? void 0 : payload.length)) return null;
      const [item] = payload;
      const key = `${labelKey || item.dataKey || item.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value = !labelKey && typeof label === "string" ? ((_a = config[label]) == null ? void 0 : _a.label) || label : itemConfig == null ? void 0 : itemConfig.label;
      if (labelFormatter) return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("font-medium", labelClassName), children: labelFormatter(value, payload) });
      if (!value) return null;
      return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("font-medium", labelClassName), children: value });
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);
    if (!active || !(payload == null ? void 0 : payload.length)) return null;
    const nestLabel = payload.length === 1 && indicator !== "dot";
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, className: cn("grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl", className), children: [
      !nestLabel ? tooltipLabel : null,
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid gap-1.5", children: payload.map((item, index) => {
        var _a;
        const key = `${nameKey || item.name || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        const indicatorColor = color || ((_a = item.payload) == null ? void 0 : _a.fill) || item.color;
        return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground", indicator === "dot" && "items-center"), children: formatter && (item == null ? void 0 : item.value) !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          (itemConfig == null ? void 0 : itemConfig.icon) ? /* @__PURE__ */ jsxRuntime.jsx(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]", { "h-2.5 w-2.5": indicator === "dot", "w-1": indicator === "line", "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed", "my-0.5": nestLabel && indicator === "dashed" }), style: { ["--color-bg"]: indicatorColor, ["--color-border"]: indicatorColor } }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("flex flex-1 justify-between leading-none", nestLabel ? "items-end" : "items-center"), children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-1.5", children: [
              nestLabel ? tooltipLabel : null,
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: (itemConfig == null ? void 0 : itemConfig.label) || item.name })
            ] }),
            item.value && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-mono font-medium tabular-nums text-foreground", children: item.value.toLocaleString() })
          ] })
        ] }) }, item.dataKey);
      }) })
    ] });
  }
);
ChartTooltipContent.displayName = "ChartTooltip";
const ChartLegend = RechartsPrimitive__namespace.Legend;
const ChartLegendContent = React__namespace.forwardRef(
  ({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
    const { config } = useChart();
    if (!(payload == null ? void 0 : payload.length)) return null;
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className), children: payload.map((item) => {
      const key = `${nameKey || item.dataKey || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"), children: [
        (itemConfig == null ? void 0 : itemConfig.icon) && !hideIcon ? /* @__PURE__ */ jsxRuntime.jsx(itemConfig.icon, {}) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-2 w-2 shrink-0 rounded-[2px]", style: { backgroundColor: item.color } }),
        itemConfig == null ? void 0 : itemConfig.label
      ] }, item.value);
    }) });
  }
);
ChartLegendContent.displayName = "ChartLegend";
function getPayloadConfigFromPayload(config, payload, key) {
  const payloadPayload = payload && typeof payload === "object" ? payload.payload : void 0;
  let configLabelKey = key;
  if (payload && key in payload && typeof payload[key] === "string") configLabelKey = payload[key];
  else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") configLabelKey = payloadPayload[key];
  return configLabelKey in config ? config[configLabelKey] : config[key];
}

const BaseLineChart = ({
  data,
  lines,
  config,
  height = 300,
  grid = true,
  areaUnder = false,
  referenceLines = [],
  tooltipProps,
  className
}) => /* @__PURE__ */ jsxRuntime.jsx(ChartContainer, { config, className: cn("w-full", className), style: { height }, children: /* @__PURE__ */ jsxRuntime.jsxs(RechartsPrimitive.LineChart, { data, margin: { top: 8, right: 12, left: 12, bottom: 8 }, children: [
  grid && /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.CartesianGrid, { strokeDasharray: "3 3", className: "stroke-border/40" }),
  /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.XAxis, { dataKey: "category", tickLine: false, axisLine: false, tickMargin: 8 }),
  /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.YAxis, { width: 40, tickLine: false, axisLine: false, tickMargin: 4 }),
  /* @__PURE__ */ jsxRuntime.jsx(ChartTooltip, { content: /* @__PURE__ */ jsxRuntime.jsx(ChartTooltipContent, {}), ...tooltipProps }),
  /* @__PURE__ */ jsxRuntime.jsx(ChartLegend, { content: /* @__PURE__ */ jsxRuntime.jsx(ChartLegendContent, {}) }),
  referenceLines.map((r, i) => /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.ReferenceLine, { ...r, stroke: r.stroke || "hsl(var(--muted-foreground))" }, i)),
  lines.map((l, i) => {
    var _a;
    return /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.Line, { type: l.type || "monotone", dataKey: l.dataKey, stroke: l.stroke || `var(--color-${l.dataKey})`, strokeWidth: l.strokeWidth || 2, dot: (_a = l.dot) != null ? _a : false, activeDot: { r: 5 } }, i);
  }),
  areaUnder && lines.length === 1 && /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.Area, { dataKey: lines[0].dataKey, type: "monotone", stroke: "none", fill: `var(--color-${lines[0].dataKey})`, fillOpacity: 0.15 })
] }) });
const SimpleLineChart = ({ data }) => /* @__PURE__ */ jsxRuntime.jsx(BaseLineChart, { data, config: { value: { label: "Valor", color: chartColor(0) } }, lines: [{ dataKey: "value", stroke: chartColor(0) }], areaUnder: true });
const MultiLineChart = ({ data, series }) => {
  const config = series.reduce((acc, key, idx) => {
    acc[key] = { label: key, color: chartColor(idx) };
    return acc;
  }, {});
  return /* @__PURE__ */ jsxRuntime.jsx(BaseLineChart, { data, config, lines: series.map((s, i) => ({ dataKey: s, dot: false, stroke: chartColor(i) })), grid: true });
};
const LineChartWithReference = ({ data, referenceY }) => /* @__PURE__ */ jsxRuntime.jsx(BaseLineChart, { data, config: { value: { label: "Valor", color: chartColor(0) } }, lines: [{ dataKey: "value", dot: true, stroke: chartColor(0) }], referenceLines: [{ y: referenceY, stroke: chartColor(1), strokeDasharray: "4 4", label: `Meta ${referenceY}` }] });
const BaseBarChart = ({ data, bars, config, height = 300, grid = true, stacked = false, tooltipProps, className }) => /* @__PURE__ */ jsxRuntime.jsx(ChartContainer, { config, className: cn("w-full", className), style: { height }, children: /* @__PURE__ */ jsxRuntime.jsxs(RechartsPrimitive.BarChart, { data, margin: { top: 8, right: 12, left: 12, bottom: 8 }, children: [
  grid && /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.CartesianGrid, { strokeDasharray: "3 3", className: "stroke-border/40" }),
  /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.XAxis, { dataKey: "category", tickLine: false, axisLine: false, tickMargin: 8 }),
  /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.YAxis, { width: 40, tickLine: false, axisLine: false, tickMargin: 4 }),
  /* @__PURE__ */ jsxRuntime.jsx(ChartTooltip, { content: /* @__PURE__ */ jsxRuntime.jsx(ChartTooltipContent, {}), ...tooltipProps }),
  /* @__PURE__ */ jsxRuntime.jsx(ChartLegend, { content: /* @__PURE__ */ jsxRuntime.jsx(ChartLegendContent, {}) }),
  bars.map((b, i) => {
    var _a;
    return /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.Bar, { dataKey: b.dataKey, fill: b.fill || `var(--color-${b.dataKey})`, stackId: stacked ? b.stackId || "stack" : b.stackId, radius: (_a = b.radius) != null ? _a : 4 }, i);
  })
] }) });
const SimpleBarChart = ({ data }) => /* @__PURE__ */ jsxRuntime.jsx(
  BaseBarChart,
  {
    data,
    config: { value: { label: "Valor", color: chartColor(0) } },
    bars: [{ dataKey: "value", fill: chartColor(0) }]
  }
);
const StackedBarChart = ({ data, series }) => {
  const config = series.reduce((acc, key, idx) => {
    acc[key] = { label: key, color: chartColor(idx) };
    return acc;
  }, {});
  return /* @__PURE__ */ jsxRuntime.jsx(BaseBarChart, { data, config, bars: series.map((s, i) => ({ dataKey: s, fill: chartColor(i) })), stacked: true });
};
const SimpleAreaChart = ({ data }) => /* @__PURE__ */ jsxRuntime.jsx(
  BaseLineChart,
  {
    data,
    config: { value: { label: "Valor", color: chartColor(0) } },
    lines: [{ dataKey: "value", type: "monotone", stroke: chartColor(0) }],
    areaUnder: true
  }
);

const DonutChart = ({ data, height = 260, innerRadius = 60, outerRadius = 100, config, className }) => {
  const cfg = config || data.reduce((acc, d, i) => {
    acc[d.name] = { label: d.name, color: d.fill || chartColor(i) };
    return acc;
  }, {});
  return /* @__PURE__ */ jsxRuntime.jsx(ChartContainer, { config: cfg, className: cn("w-full", className), style: { height }, children: /* @__PURE__ */ jsxRuntime.jsxs(RechartsPrimitive.PieChart, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.Pie, { data, dataKey: "value", nameKey: "name", innerRadius, outerRadius, paddingAngle: 2, stroke: "none", children: data.map((d, i) => /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.Cell, { fill: d.fill || chartColor(i) }, i)) }),
    /* @__PURE__ */ jsxRuntime.jsx(ChartTooltip, { content: /* @__PURE__ */ jsxRuntime.jsx(ChartTooltipContent, {}) })
  ] }) });
};
const ScatterPointsChart = ({ data, height = 260, showZ = false, className }) => {
  const groups = data.reduce((acc, d) => {
    const key = d.category || "Serie";
    (acc[key] = acc[key] || []).push(d);
    return acc;
  }, {});
  const config = Object.keys(groups).reduce((a, k, i) => {
    a[k] = { label: k, color: chartColor(i) };
    return a;
  }, {});
  return /* @__PURE__ */ jsxRuntime.jsx(ChartContainer, { config, className: cn("w-full", className), style: { height }, children: /* @__PURE__ */ jsxRuntime.jsxs(RechartsPrimitive.ScatterChart, { margin: { top: 8, right: 12, bottom: 8, left: 12 }, children: [
    /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.XAxis, { dataKey: "x", type: "number", tickLine: false, axisLine: false }),
    /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.YAxis, { dataKey: "y", type: "number", tickLine: false, axisLine: false }),
    showZ && /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.ZAxis, { dataKey: "z", range: [40, 400] }),
    /* @__PURE__ */ jsxRuntime.jsx(ChartTooltip, { content: /* @__PURE__ */ jsxRuntime.jsx(ChartTooltipContent, {}) }),
    Object.entries(groups).map(([k, vals], i) => /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.Scatter, { name: k, data: vals, fill: chartColor(i) }, k))
  ] }) });
};
const SimpleRadarChart = ({ data, series, height = 300, className }) => {
  const config = series.reduce((acc, s, i) => {
    acc[s] = { label: s, color: chartColor(i) };
    return acc;
  }, {});
  return /* @__PURE__ */ jsxRuntime.jsx(ChartContainer, { config, className: cn("w-full", className), style: { height }, children: /* @__PURE__ */ jsxRuntime.jsxs(RechartsPrimitive.RadarChart, { data, children: [
    /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.PolarGrid, {}),
    /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.PolarAngleAxis, { dataKey: "subject" }),
    /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.PolarRadiusAxis, {}),
    series.map((s, i) => /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.Radar, { dataKey: s, stroke: chartColor(i), fill: chartColor(i), fillOpacity: 0.2 }, s)),
    /* @__PURE__ */ jsxRuntime.jsx(ChartTooltip, { content: /* @__PURE__ */ jsxRuntime.jsx(ChartTooltipContent, {}) })
  ] }) });
};
const SimpleHeatmap = ({ data, height = 300, className }) => {
  const config = data.reduce((acc, d, i) => {
    acc[d.name] = { label: d.name, color: d.fill || chartColor(i) };
    return acc;
  }, {});
  return /* @__PURE__ */ jsxRuntime.jsx(ChartContainer, { config, className: cn("w-full", className), style: { height }, children: /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.Treemap, { data: data.map((d, i) => ({ ...d, fill: d.fill || chartColor(i) })), dataKey: "value", stroke: "var(--background)", fill: "transparent" }) });
};
const HeatmapChart = ({ data, xKeys, yKeys, height = 320, width, className, colors, baseColor, colorStops, valueFormatter, gap = 0, showCellValues = true, showAxes = false, title }) => {
  const [hover, setHover] = React.useState(null);
  const xs = xKeys || Array.from(new Set(data.map((d) => d.x)));
  const ys = yKeys || Array.from(new Set(data.map((d) => d.y)));
  const max = Math.max(...data.map((d) => d.value)) || 1;
  const min = Math.min(...data.map((d) => d.value)) || 0;
  const cfg = { value: { label: "Valor", color: "hsl(var(--primary))" } };
  let scheme = null;
  if (colorStops && colorStops.length >= 2) scheme = colorStops;
  else if (baseColor) {
    const alphaFrom = baseColor.startsWith("hsl(") ? baseColor.replace(/\)$/, " / 0.15)") : baseColor + "26";
    scheme = [alphaFrom, baseColor];
  }
  const finalColors = colors || (scheme ? { from: scheme[0], to: scheme[scheme.length - 1] } : { from: chartColor(0).replace(/\)$/, " / 0.15)"), to: chartColor(0) });
  if (!scheme) scheme = [finalColors.from, finalColors.to];
  function interpColor(stopA, stopB, t) {
    return t < 0.5 ? stopA : stopB;
  }
  function cellColor(v) {
    if (max === min) return scheme[scheme.length - 1];
    const ratio = (v - min) / (max - min);
    if (scheme.length === 2) {
      const [from, to] = scheme;
      if (to.startsWith("hsl(") && from.includes("/")) {
        const base = to.replace(/\)$/, "");
        return base + ` / ${0.15 + ratio * 0.85})`;
      }
      return ratio < 0.5 ? from : to;
    }
    const seg = 1 / (scheme.length - 1);
    const idx = Math.min(scheme.length - 2, Math.floor(ratio / seg));
    const localT = (ratio - idx * seg) / seg;
    return interpColor(scheme[idx], scheme[idx + 1], localT);
  }
  const mLeft = showAxes ? 1.2 : 0;
  const mBottom = showAxes ? 1 : 0;
  const totalW = xs.length + mLeft;
  const totalH = ys.length + mBottom;
  return /* @__PURE__ */ jsxRuntime.jsx(ChartContainer, { config: cfg, className: cn("w-full", className), style: { height, width }, "aria-label": title || "Heatmap chart", children: /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: "relative w-full h-full flex items-center justify-center p-4 overflow-hidden",
      onMouseLeave: () => setHover(null),
      onMouseMove: (e) => {
        const container = e.currentTarget;
        const bounds = container.getBoundingClientRect();
        const relX = e.clientX - bounds.left;
        const relY = e.clientY - bounds.top;
        const cw = bounds.width / totalW;
        const ch = bounds.height / totalH;
        if (relX < mLeft * cw || relY > ys.length * ch) {
          setHover(null);
          return;
        }
        const xi = Math.floor((relX - mLeft * cw) / cw);
        const yi = Math.floor(relY / ch);
        if (xi < 0 || xi >= xs.length || yi < 0 || yi >= ys.length) {
          setHover(null);
          return;
        }
        const x = xs[xi], y = ys[yi];
        const cell = data.find((d) => d.x === x && d.y === y);
        if (!cell) {
          setHover(null);
          return;
        }
        setHover({ x, y, value: cell.value, cx: (mLeft + xi + 0.5) * cw, cy: (yi + 0.5) * ch });
      },
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("svg", { width: "100%", height: "100%", preserveAspectRatio: "xMidYMid meet", viewBox: `0 0 ${totalW} ${totalH}`, children: [
          title && /* @__PURE__ */ jsxRuntime.jsx("text", { x: mLeft, y: -0.6, fontSize: 0.45, fill: "hsl(var(--muted-foreground))", textAnchor: "start", children: title }),
          /* @__PURE__ */ jsxRuntime.jsx("g", { className: "cells", children: ys.map((y, yi) => xs.map((x, xi) => {
            var _a;
            const cell = data.find((d) => d.x === x && d.y === y);
            const v = (_a = cell == null ? void 0 : cell.value) != null ? _a : 0;
            const g = Math.min(Math.max(gap, 0), 0.9);
            const off = g / 2;
            const size = 1 - g;
            const isActive = hover && hover.x === x && hover.y === y;
            return /* @__PURE__ */ jsxRuntime.jsxs("g", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("rect", { x: mLeft + xi + off, y: yi + off, width: size, height: size, rx: 0.12, fill: cellColor(v), stroke: isActive ? "hsl(var(--foreground))" : "none", strokeWidth: isActive ? 0.04 : 0 }),
              showCellValues && /* @__PURE__ */ jsxRuntime.jsx("text", { x: mLeft + xi + 0.5, y: yi + 0.5, textAnchor: "middle", dominantBaseline: "middle", fontSize: 0.28, fill: "hsl(var(--foreground) / 0.7)", children: valueFormatter ? valueFormatter(v) : v })
            ] }, `${x}-${y}`);
          })) }),
          showAxes && /* @__PURE__ */ jsxRuntime.jsxs("g", { className: "axes", fontSize: 0.3, fill: "hsl(var(--muted-foreground))", children: [
            ys.map((y, yi) => /* @__PURE__ */ jsxRuntime.jsx("text", { x: mLeft - 0.25, y: yi + 0.5, textAnchor: "end", dominantBaseline: "middle", children: String(y) }, `y-${y}`)),
            xs.map((x, xi) => /* @__PURE__ */ jsxRuntime.jsx("text", { x: mLeft + xi + 0.5, y: ys.length + 0.55, textAnchor: "middle", dominantBaseline: "middle", children: String(x) }, `x-${x}`))
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("g", { fontSize: 0.3, fill: "hsl(var(--muted-foreground))", children: [
            /* @__PURE__ */ jsxRuntime.jsx("text", { x: 0, y: title ? -0.15 : -0.4, children: min }),
            /* @__PURE__ */ jsxRuntime.jsx("text", { x: mLeft + xs.length - 1, y: title ? -0.15 : -0.4, textAnchor: "end", children: max })
          ] })
        ] }),
        hover && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md border bg-popover px-2 py-1 text-[10px] shadow-md", style: { left: hover.cx, top: hover.cy }, children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "font-medium", children: valueFormatter ? valueFormatter(hover.value) : hover.value }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-muted-foreground", children: [
            "(",
            String(hover.x),
            ", ",
            String(hover.y),
            ")"
          ] })
        ] })
      ]
    }
  ) });
};

const GaugeChart = ({
  value,
  maxValue = 100,
  height = 180,
  barSize = 18,
  color,
  showValue = true,
  formatValue,
  label,
  className
}) => {
  const pct = Math.max(0, Math.min(1, value / maxValue));
  const display = formatValue ? formatValue(value, pct) : `${Math.round(pct * 100)}%`;
  const data = [{ name: "value", value: pct * 100 }];
  const thicknessPct = Math.min(40, Math.max(6, barSize));
  const outerRadius = 100;
  const innerRadius = outerRadius - thicknessPct;
  const config = { value: { label: "Valor", color: color || "hsl(var(--primary))" } };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className, style: { height }, children: [
    /* @__PURE__ */ jsxRuntime.jsx(ChartContainer, { config, className: "w-full h-full !aspect-auto", children: /* @__PURE__ */ jsxRuntime.jsxs(RechartsPrimitive.RadialBarChart, { data, startAngle: 180, endAngle: 0, innerRadius: innerRadius + "%", outerRadius: outerRadius + "%", children: [
      /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.PolarAngleAxis, { type: "number", domain: [0, 100], dataKey: "value", tick: false }),
      /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive.RadialBar, { background: true, dataKey: "value", cornerRadius: thicknessPct, fill: color || "var(--color-value)", stroke: "none", className: "[&_.recharts-radial-bar-background-sector]:fill-muted" })
    ] }) }),
    showValue && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "-mt-14 flex flex-col items-center pointer-events-none select-none", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-semibold tabular-nums leading-none", children: display }),
      label && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-xs mt-1 text-muted-foreground", children: label })
    ] })
  ] });
};

exports.ActionsMenu = ActionsMenu;
exports.Badge = Badge;
exports.BaseBarChart = BaseBarChart;
exports.BaseLineChart = BaseLineChart;
exports.Button = Button;
exports.Command = Command;
exports.CommandDialog = CommandDialog;
exports.CommandEmpty = CommandEmpty;
exports.CommandGroup = CommandGroup;
exports.CommandInput = CommandInput;
exports.CommandItem = CommandItem;
exports.CommandList = CommandList;
exports.CommandPaletteExample = CommandPaletteExample;
exports.CommandSeparator = CommandSeparator;
exports.CommandShortcut = CommandShortcut;
exports.DataTable = DataTable;
exports.DataTableFacetedFilter = DataTableFacetedFilter;
exports.DataTablePagination = DataTablePagination;
exports.DataTableToolbar = DataTableToolbar;
exports.DataTableViewOptions = DataTableViewOptions;
exports.Dialog = Dialog;
exports.DialogClose = DialogClose;
exports.DialogContent = DialogContent;
exports.DialogDescription = DialogDescription;
exports.DialogFooter = DialogFooter;
exports.DialogHeader = DialogHeader;
exports.DialogOverlay = DialogOverlay;
exports.DialogPortal = DialogPortal;
exports.DialogTitle = DialogTitle;
exports.DialogTrigger = DialogTrigger;
exports.DonutChart = DonutChart;
exports.DropdownMenu = DropdownMenu;
exports.DropdownMenuCheckboxItem = DropdownMenuCheckboxItem;
exports.DropdownMenuContent = DropdownMenuContent;
exports.DropdownMenuGroup = DropdownMenuGroup;
exports.DropdownMenuItem = DropdownMenuItem;
exports.DropdownMenuLabel = DropdownMenuLabel;
exports.DropdownMenuPortal = DropdownMenuPortal;
exports.DropdownMenuRadioGroup = DropdownMenuRadioGroup;
exports.DropdownMenuRadioItem = DropdownMenuRadioItem;
exports.DropdownMenuSeparator = DropdownMenuSeparator;
exports.DropdownMenuShortcut = DropdownMenuShortcut;
exports.DropdownMenuSub = DropdownMenuSub;
exports.DropdownMenuSubContent = DropdownMenuSubContent;
exports.DropdownMenuSubTrigger = DropdownMenuSubTrigger;
exports.DropdownMenuTrigger = DropdownMenuTrigger;
exports.FORMATTERS = FORMATTERS;
exports.GaugeChart = GaugeChart;
exports.HeatmapChart = HeatmapChart;
exports.Input = Input;
exports.LineChartWithReference = LineChartWithReference;
exports.MultiLineChart = MultiLineChart;
exports.Popover = Popover;
exports.PopoverContent = PopoverContent;
exports.PopoverTrigger = PopoverTrigger;
exports.ScatterPointsChart = ScatterPointsChart;
exports.Select = Select;
exports.SelectContent = SelectContent;
exports.SelectGroup = SelectGroup;
exports.SelectItem = SelectItem;
exports.SelectLabel = SelectLabel;
exports.SelectSeparator = SelectSeparator;
exports.SelectTrigger = SelectTrigger;
exports.SelectValue = SelectValue;
exports.Separator = Separator;
exports.SimpleAreaChart = SimpleAreaChart;
exports.SimpleBarChart = SimpleBarChart;
exports.SimpleHeatmap = SimpleHeatmap;
exports.SimpleLineChart = SimpleLineChart;
exports.SimpleRadarChart = SimpleRadarChart;
exports.StackedBarChart = StackedBarChart;
exports.Table = Table;
exports.TableBody = TableBody;
exports.TableCaption = TableCaption;
exports.TableCell = TableCell;
exports.TableFooter = TableFooter;
exports.TableHead = TableHead;
exports.TableHeader = TableHeader;
exports.TableRow = TableRow;
exports.applyTemplate = applyTemplate;
exports.badgeVariants = badgeVariants;
exports.buttonVariants = buttonVariants;
exports.createActionsColumn = createActionsColumn;
exports.createCustomFormatter = createCustomFormatter;
exports.defaultActions = defaultActions;
exports.defaultActionsColumnConfig = defaultActionsColumnConfig;
exports.formatCell = formatCell;
//# sourceMappingURL=index.cjs.js.map
