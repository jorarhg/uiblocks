import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as React from 'react';
import React__default from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X, ChevronRight, Check, Circle, ChevronDown, ChevronUp, Search, Zap, Heart, Star, AlertCircle, XCircle, CheckCircle, Clock, CircleDashedIcon, CircleIcon, Minus, Plus, Filter, Eye, Trash2, Edit, Upload, Download, FileText, Camera, MapPin, Building, Home, Settings, Calendar, Phone, Mail, User, ListFilter, CheckIcon, ChevronsLeft, ChevronLeft, ChevronsRight, GripVertical, Archive, Copy, MoreHorizontal } from 'lucide-react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Command as Command$1 } from 'cmdk';
import { useReactTable, getExpandedRowModel, getGroupedRowModel, getFacetedUniqueValues, getFacetedRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, getCoreRowModel, flexRender } from '@tanstack/react-table';
import * as RechartsPrimitive from 'recharts';
import { LineChart, CartesianGrid, XAxis, YAxis, ReferenceLine, Line, Area, BarChart, Bar, PieChart, Pie, Cell, ScatterChart, ZAxis, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Treemap } from 'recharts';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const badgeVariants = cva(
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
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
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
var Slot = React.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = React.Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);
  if (slottable) {
    const newElement = slottable.props.children;
    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        if (React.Children.count(newElement) > 1) return React.Children.only(null);
        return React.isValidElement(newElement) ? newElement.props.children : null;
      } else {
        return child;
      }
    });
    return /* @__PURE__ */ jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: React.isValidElement(newElement) ? React.cloneElement(newElement, void 0, newChildren) : null });
  }
  return /* @__PURE__ */ jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
});
Slot.displayName = "Slot";
var SlotClone = React.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  if (React.isValidElement(children)) {
    const childrenRef = getElementRef(children);
    return React.cloneElement(children, {
      ...mergeProps(slotProps, children.props),
      // @ts-ignore
      ref: forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef
    });
  }
  return React.Children.count(children) > 1 ? React.Children.only(null) : null;
});
SlotClone.displayName = "SlotClone";
var Slottable = ({ children }) => {
  return /* @__PURE__ */ jsx(Fragment, { children });
};
function isSlottable(child) {
  return React.isValidElement(child) && child.type === Slottable;
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

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  { variants: { variant: { default: "bg-primary text-primary-foreground hover:bg-primary/90", destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90", outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground", secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80", ghost: "hover:bg-accent hover:text-accent-foreground", link: "text-primary underline-offset-4 hover:underline" }, size: { default: "h-10 px-4 py-2", sm: "h-9 rounded-md px-3", lg: "h-11 rounded-md px-8", icon: "h-10 w-10" } }, defaultVariants: { variant: "default", size: "default" } }
);
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
});
Button.displayName = "Button";

const Table = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx(
    "table",
    {
      ref,
      className: cn("w-full caption-bottom text-sm", className),
      ...props
    }
  ) });
});
Table.displayName = "Table";
const TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "thead",
  {
    ref,
    className: cn("[&_tr]:border-b", className),
    ...props
  }
));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
const TableRow = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
const TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
const TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "td",
  {
    ref,
    className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
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

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
    ...props
  }
);
const DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
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
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(
  SeparatorPrimitive.Root,
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
Separator.displayName = SeparatorPrimitive.Root.displayName;

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
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
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
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
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
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
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const DropdownMenuShortcut = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "span",
  {
    className: cn("ml-auto text-xs tracking-widest opacity-60", className),
    ...props
  }
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

const Command = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Command$1, { ref, className: cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className), ...props }));
Command.displayName = Command$1.displayName;
const CommandDialog = ({ children, ...props }) => /* @__PURE__ */ jsx(Dialog, { ...props, children: /* @__PURE__ */ jsx(DialogContent, { className: "overflow-hidden p-0 shadow-lg", children: /* @__PURE__ */ jsx(Command, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", children }) }) });
const CommandInput = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsx(Command$1.Input, { ref, className: cn("flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50", className), ...props })
] }));
CommandInput.displayName = Command$1.Input.displayName;
const CommandList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Command$1.List, { ref, className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className), ...props }));
CommandList.displayName = Command$1.List.displayName;
const CommandEmpty = React.forwardRef((props, ref) => /* @__PURE__ */ jsx(Command$1.Empty, { ref, className: "py-6 text-center text-sm", ...props }));
CommandEmpty.displayName = Command$1.Empty.displayName;
const CommandGroup = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Command$1.Group, { ref, className: cn("overflow-hidden p-1 text-foreground", className), ...props }));
CommandGroup.displayName = Command$1.Group.displayName;
const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Command$1.Separator, { ref, className: cn("-mx-1 h-px bg-border", className), ...props }));
CommandSeparator.displayName = Command$1.Separator.displayName;
const CommandItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Command$1.Item, { ref, className: cn("relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[selected=true]:bg-accent", className), ...props }));
CommandItem.displayName = Command$1.Item.displayName;
const CommandShortcut = ({ className, ...props }) => /* @__PURE__ */ jsx("span", { className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className), ...props });
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
    content: /* @__PURE__ */ jsx("span", { className: options == null ? void 0 : options.className, children: displayValue }),
    className: options == null ? void 0 : options.className,
    style: options == null ? void 0 : options.style
  };
};

const BADGE_ICONS = {
  "circle": CircleIcon,
  "circle-dashed": CircleDashedIcon,
  "clock": Clock,
  "check-circle": CheckCircle,
  "x-circle": XCircle,
  "alert-circle": AlertCircle,
  "star": Star,
  "heart": Heart,
  "zap": Zap
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
    content: /* @__PURE__ */ jsxs(Badge, { variant, className: combinedClassName, style: combinedStyle, children: [
      IconComponent && /* @__PURE__ */ jsx(IconComponent, { className: `mr-1 h-3 w-3 ${(options == null ? void 0 : options.iconClassName) || ""}` }),
      displayText
    ] })
  };
};

const DateFormatter = ({ value, field }) => {
  var _a;
  const options = (_a = field.formatter) == null ? void 0 : _a.options;
  if (!value) return { content: /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "-" }) };
  const date = new Date(value);
  if (isNaN(date.getTime())) return { content: /* @__PURE__ */ jsx("span", { className: options == null ? void 0 : options.className, children: value }) };
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
  return { content: /* @__PURE__ */ jsx("span", { className: options == null ? void 0 : options.className, title: date.toLocaleString(locale), children: formattedDate }), style: options == null ? void 0 : options.style };
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
  if (value === null || value === void 0 || isNaN(Number(value))) return { content: /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "-" }) };
  const currency = (options == null ? void 0 : options.currency) || "EUR";
  const decimals = (_b = options == null ? void 0 : options.decimals) != null ? _b : 2;
  const locale = (options == null ? void 0 : options.locale) || "es-ES";
  try {
    const formatter = new Intl.NumberFormat(locale, { style: "currency", currency, minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    const formattedValue = formatter.format(Number(value));
    return { content: /* @__PURE__ */ jsx("span", { className: options == null ? void 0 : options.className, children: formattedValue }), style: options == null ? void 0 : options.style };
  } catch {
    return { content: /* @__PURE__ */ jsxs("span", { className: options == null ? void 0 : options.className, children: [
      Number(value).toFixed(decimals),
      " ",
      currency
    ] }), style: options == null ? void 0 : options.style };
  }
};

const PercentageFormatter = ({ value, field }) => {
  var _a, _b;
  const options = (_a = field.formatter) == null ? void 0 : _a.options;
  if (value === null || value === void 0 || isNaN(Number(value))) return { content: /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "-" }) };
  const decimals = (_b = options == null ? void 0 : options.decimals) != null ? _b : 1;
  const suffix = (options == null ? void 0 : options.suffix) || "%";
  let percentageValue = Number(value);
  if (percentageValue <= 1 && percentageValue >= 0) percentageValue *= 100;
  const formattedValue = percentageValue.toFixed(decimals);
  return { content: /* @__PURE__ */ jsxs("span", { className: options == null ? void 0 : options.className, children: [
    formattedValue,
    suffix
  ] }), style: options == null ? void 0 : options.style };
};

const ICON_REGISTRY$1 = { "circle": CircleIcon, "circle-dashed": CircleDashedIcon, "clock": Clock, "check-circle": CheckCircle, "x-circle": XCircle, "alert-circle": AlertCircle, "star": Star, "heart": Heart, "zap": Zap, "user": User, "mail": Mail, "phone": Phone, "calendar": Calendar, "settings": Settings, "home": Home, "building": Building, "map-pin": MapPin, "camera": Camera, "file-text": FileText, "download": Download, "upload": Upload, "edit": Edit, "trash": Trash2, "eye": Eye, "search": Search, "filter": Filter, "plus": Plus, "minus": Minus };
const IconFormatter = ({ value, field }) => {
  var _a, _b;
  const options = (_a = field.formatter) == null ? void 0 : _a.options;
  const valueConfig = (_b = options == null ? void 0 : options.valueMap) == null ? void 0 : _b[value];
  const iconKey = (valueConfig == null ? void 0 : valueConfig.icon) || (options == null ? void 0 : options.icon) || value;
  const IconComponent = ICON_REGISTRY$1[iconKey];
  if (!IconComponent) return { content: /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "-" }) };
  const combinedClassName = ["h-4 w-4", options == null ? void 0 : options.iconClassName, valueConfig == null ? void 0 : valueConfig.className, options == null ? void 0 : options.className].filter(Boolean).join(" ");
  return { content: /* @__PURE__ */ jsx(IconComponent, { className: combinedClassName, style: { ...options == null ? void 0 : options.style, ...valueConfig == null ? void 0 : valueConfig.style } }) };
};

const ICON_REGISTRY = { "circle": CircleIcon, "circle-dashed": CircleDashedIcon, "clock": Clock, "check-circle": CheckCircle, "x-circle": XCircle, "alert-circle": AlertCircle, "star": Star, "heart": Heart, "zap": Zap, "user": User, "mail": Mail, "phone": Phone, "calendar": Calendar, "settings": Settings, "home": Home, "building": Building, "map-pin": MapPin, "camera": Camera, "file-text": FileText, "download": Download, "upload": Upload, "edit": Edit, "trash": Trash2, "eye": Eye, "search": Search, "filter": Filter, "plus": Plus, "minus": Minus };
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
  return { content: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
    IconComponent && iconPosition === "left" && /* @__PURE__ */ jsx(IconComponent, { className: iconClassName }),
    /* @__PURE__ */ jsx("span", { className: textClassName, children: displayText }),
    IconComponent && iconPosition === "right" && /* @__PURE__ */ jsx(IconComponent, { className: iconClassName })
  ] }), style: { ...options == null ? void 0 : options.style, ...valueConfig == null ? void 0 : valueConfig.style } };
};

const CustomFormatter = ({ value, field, record }) => {
  var _a;
  const options = (_a = field.formatter) == null ? void 0 : _a.options;
  if (options == null ? void 0 : options.template) {
    const processedValue = applyTemplate(options.template, value, record);
    return { content: /* @__PURE__ */ jsx("span", { className: options == null ? void 0 : options.className, style: options == null ? void 0 : options.style, children: processedValue }) };
  }
  return { content: /* @__PURE__ */ jsx("span", { className: options == null ? void 0 : options.className, style: options == null ? void 0 : options.style, children: String(value || "") }) };
};

const HtmlFormatter = ({ value, field, record }) => {
  var _a;
  const options = (_a = field.formatter) == null ? void 0 : _a.options;
  let htmlContent = String(value || "");
  if (options == null ? void 0 : options.template) htmlContent = applyTemplate(options.template, value, record);
  return { content: /* @__PURE__ */ jsx("div", { className: options == null ? void 0 : options.className, style: options == null ? void 0 : options.style, dangerouslySetInnerHTML: { __html: htmlContent } }) };
};

const LinkFormatter = ({ value, field, record }) => {
  var _a;
  const options = (_a = field.formatter) == null ? void 0 : _a.options;
  if (!value) return { content: /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "-" }) };
  let href;
  if (typeof (options == null ? void 0 : options.href) === "function") href = options.href(value, record);
  else if (options == null ? void 0 : options.href) href = applyTemplate(options.href, value, record);
  else href = String(value);
  let displayText = value;
  if (options == null ? void 0 : options.template) displayText = applyTemplate(options.template, value, record);
  const target = (options == null ? void 0 : options.target) || "_self";
  return { content: /* @__PURE__ */ jsx("a", { href, target, rel: target === "_blank" ? "noopener noreferrer" : void 0, className: `hover:underline ${(options == null ? void 0 : options.linkClassName) || "text-blue-600"} ${(options == null ? void 0 : options.className) || ""}`, style: options == null ? void 0 : options.style, children: displayText }) };
};

const ImageFormatter = ({ value, field }) => {
  var _a;
  const options = (_a = field.formatter) == null ? void 0 : _a.options;
  if (!value) return { content: /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "-" }) };
  const width = (options == null ? void 0 : options.width) || 32;
  const height = (options == null ? void 0 : options.height) || 32;
  const alt = (options == null ? void 0 : options.alt) || "Image";
  const fallbackSrc = (options == null ? void 0 : options.fallbackSrc) || "/placeholder.svg";
  return { content: /* @__PURE__ */ jsx("img", { src: String(value), alt, width, height, className: `rounded ${(options == null ? void 0 : options.className) || ""}`, style: options == null ? void 0 : options.style, onError: (e) => {
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
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "h-8 w-8 p-0", children: [
      /* @__PURE__ */ jsx(Settings, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "View options" })
    ] }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", className: "w-44", children: [
      /* @__PURE__ */ jsx(DropdownMenuLabel, { className: "text-xs", children: "Toggle columns" }),
      /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
      columns.map((column) => /* @__PURE__ */ jsx(DropdownMenuCheckboxItem, { checked: column.getIsVisible(), onCheckedChange: (value) => column.toggleVisibility(!!value), className: "capitalize", children: column.id }, column.id))
    ] })
  ] });
}

function DataTableFacetedFilter({ column, title, options }) {
  const selectedValues = new Set(column == null ? void 0 : column.getFilterValue());
  return /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "h-8 border-dashed", children: [
      /* @__PURE__ */ jsx(ListFilter, { className: "mr-2 h-4 w-4" }),
      title,
      (selectedValues == null ? void 0 : selectedValues.size) > 0 && /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "ml-2 rounded-sm px-1 font-normal", children: selectedValues.size })
    ] }) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-56 p-2", align: "start", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 max-h-60 overflow-auto", children: [
      options.map((option) => {
        const isSelected = selectedValues.has(option.value);
        return /* @__PURE__ */ jsxs("button", { onClick: () => {
          if (isSelected) selectedValues.delete(option.value);
          else selectedValues.add(option.value);
          const next = Array.from(selectedValues);
          column == null ? void 0 : column.setFilterValue(next.length ? next : void 0);
        }, className: cn("flex items-center gap-2 rounded px-2 py-1 text-left text-xs hover:bg-accent", isSelected && "bg-accent"), children: [
          /* @__PURE__ */ jsx("span", { className: cn("flex h-4 w-4 items-center justify-center rounded-sm border border-primary", isSelected ? "bg-primary text-primary-foreground" : "opacity-50"), children: /* @__PURE__ */ jsx(CheckIcon, { className: "h-3 w-3" }) }),
          option.icon && /* @__PURE__ */ jsx(option.icon, { className: "h-3.5 w-3.5 text-muted-foreground" }),
          /* @__PURE__ */ jsx("span", { className: "flex-1", children: option.label }),
          option.count !== void 0 && /* @__PURE__ */ jsx("span", { className: "ml-auto font-mono text-[10px]", children: option.count })
        ] }, option.value);
      }),
      selectedValues.size > 0 && /* @__PURE__ */ jsx("button", { onClick: () => column == null ? void 0 : column.setFilterValue(void 0), className: "mt-1 rounded bg-muted px-2 py-1 text-xs", children: "Clear filters" })
    ] }) })
  ] });
}

function DataTableToolbar({ table, searchKey = "title", searchPlaceholder = "Filter rows...", filters = [], className, enableGrouping = false, grouping = [], setGrouping, groupableColumns }) {
  var _a, _b;
  const isFiltered = table.getState().columnFilters.length > 0;
  return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col gap-4 sm:flex-row sm:items-center py-4", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:max-w-xs", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsx(Input, { placeholder: searchPlaceholder, value: (_b = (_a = table.getColumn(searchKey)) == null ? void 0 : _a.getFilterValue()) != null ? _b : "", onChange: (e) => {
        var _a2;
        return (_a2 = table.getColumn(searchKey)) == null ? void 0 : _a2.setFilterValue(e.target.value);
      }, className: "w-full pl-8" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 ml-auto", children: [
      filters.map((filter) => {
        const column = table.getColumn(filter.columnId);
        if (!column) return null;
        return /* @__PURE__ */ jsx(DataTableFacetedFilter, { column, title: filter.title, options: filter.options }, filter.columnId);
      }),
      enableGrouping && groupableColumns && groupableColumns.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: groupableColumns.map((id) => {
        const col = table.getColumn(id);
        if (!col) return null;
        const isActive = grouping.includes(id);
        return /* @__PURE__ */ jsx(Button, { variant: isActive ? "default" : "outline", size: "sm", className: "h-8 px-2 text-xs", onClick: () => {
          if (!setGrouping) return;
          const next = isActive ? grouping.filter((g) => g !== id) : [...grouping, id];
          setGrouping(next);
          col.toggleGrouping();
        }, children: col.id }, id);
      }) }) }),
      isFiltered && /* @__PURE__ */ jsx(Button, { variant: "ghost", onClick: () => table.resetColumnFilters(), className: "h-8 px-2 lg:px-3", children: "Reset" }),
      /* @__PURE__ */ jsx(DataTableViewOptions, { table })
    ] }),
    enableGrouping && grouping.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 -mb-2", children: grouping.map((g) => /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs", children: [
      g,
      /* @__PURE__ */ jsx("button", { onClick: () => {
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
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Rows" }),
      /* @__PURE__ */ jsxs(Select, { value: String(pageSize), onValueChange: (val) => table.setPageSize(Number(val)), children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "h-8 w-[80px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsx(SelectContent, { children: [5, 10, 20, 30, 40, 50].map((ps) => /* @__PURE__ */ jsx(SelectItem, { value: String(ps), children: ps }, ps)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 text-sm text-muted-foreground hidden lg:block pl-3", children: [
      table.getFilteredSelectedRowModel().rows.length,
      " of ",
      table.getFilteredRowModel().rows.length,
      " selected."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-6 lg:space-x-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex w-[100px] items-center justify-center text-sm font-medium", children: [
        "Page ",
        table.getState().pagination.pageIndex + 1,
        " of ",
        table.getPageCount()
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "hidden h-8 w-8 p-0 lg:flex", onClick: () => table.setPageIndex(0), disabled: !table.getCanPreviousPage(), children: [
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "First" }),
          /* @__PURE__ */ jsx(ChevronsLeft, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "h-8 w-8 p-0", onClick: () => table.previousPage(), disabled: !table.getCanPreviousPage(), children: [
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Prev" }),
          /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "h-8 w-8 p-0", onClick: () => table.nextPage(), disabled: !table.getCanNextPage(), children: [
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Next" }),
          /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "hidden h-8 w-8 p-0 lg:flex", onClick: () => table.setPageIndex(table.getPageCount() - 1), disabled: !table.getCanNextPage(), children: [
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Last" }),
          /* @__PURE__ */ jsx(ChevronsRight, { className: "h-4 w-4" })
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
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [columnOrder, setColumnOrder] = React.useState([]);
  const [grouping, setGrouping] = React.useState([]);
  const headerContainerRef = React.useRef(null);
  const dragSourceIdRef = React.useRef(null);
  const initialLayoutRef = React.useRef(null);
  const lastPreviewTargetRef = React.useRef(null);
  const isMountedRef = React.useRef(false);
  const pendingRafRef = React.useRef(null);
  const rafTargetRef = React.useRef(null);
  const keyboardSourceIdRef = React.useRef(null);
  const keyboardTargetIdRef = React.useRef(null);
  const focusAfterReorderRef = React.useRef(null);
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
  React.useEffect(() => {
    return () => {
      clearPreviewTransforms();
    };
  }, []);
  React.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  React.useEffect(() => {
    if (columnOrder.length === 0) {
      setColumnOrder(
        columns.map((c) => {
          var _a2;
          return (_a2 = c.id) != null ? _a2 : c.accessorKey;
        }).filter(Boolean)
      );
    }
  }, [columns]);
  const table = useReactTable({
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
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    ...enableGrouping ? { getGroupedRowModel: getGroupedRowModel(), getExpandedRowModel: getExpandedRowModel() } : {}
  });
  function handleHeaderDrop(e, targetId) {
    if (!enableColumnReorder) return;
    e.preventDefault();
    const sourceId = e.dataTransfer.getData("text/plain");
    clearPreviewTransforms();
    dragSourceIdRef.current = null;
    initialLayoutRef.current = null;
    lastPreviewTargetRef.current = null;
    if (!sourceId || sourceId === targetId) return;
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
        return /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: row.getToggleExpandedHandler(),
            className: "flex items-center gap-2 font-medium",
            children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block w-4", children: row.getIsExpanded() ? "\u2212" : "+" }),
              flexRender(cell.column.columnDef.cell, cell.getContext()),
              /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "(",
                row.subRows.length,
                ")"
              ] })
            ]
          }
        );
      }
      if (cell.getIsAggregated()) {
        return flexRender(
          (_a2 = cell.column.columnDef.aggregatedCell) != null ? _a2 : cell.column.columnDef.cell,
          cell.getContext()
        );
      }
      if (cell.getIsPlaceholder()) return null;
    }
    return flexRender(cell.column.columnDef.cell, cell.getContext());
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { ref: headerContainerRef, children: table.getHeaderGroups().map((hg) => /* @__PURE__ */ jsx(TableRow, { children: hg.headers.map((header) => {
        var _a2, _b;
        const id = header.column.id;
        const canReorder = enableColumnReorder && header.column.getCanHide() && !((_b = (_a2 = header.column.columnDef) == null ? void 0 : _a2.meta) == null ? void 0 : _b.disableReorder);
        return /* @__PURE__ */ jsxs(
          TableHead,
          {
            "data-col-id": id,
            onDragOver: (e) => {
              if (enableColumnReorder && dragSourceIdRef.current) {
                e.preventDefault();
                schedulePreview(id);
              }
            },
            onDragEnter: (e) => {
              if (enableColumnReorder && dragSourceIdRef.current && e.currentTarget === e.target) {
                schedulePreview(id);
              }
            },
            onDrop: (e) => handleHeaderDrop(e, id),
            className: canReorder ? "relative select-none" : void 0,
            children: [
              canReorder && /* @__PURE__ */ jsx(
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
                  children: /* @__PURE__ */ jsx(GripVertical, { className: "h-3 w-3 opacity-60" })
                }
              ),
              /* @__PURE__ */ jsx("div", { className: canReorder ? "pl-4" : void 0, children: header.isPlaceholder ? null : flexRender(
                header.column.columnDef.header,
                header.getContext()
              ) })
            ]
          },
          header.id
        );
      }) }, hg.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: ((_a = table.getRowModel().rows) == null ? void 0 : _a.length) ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
        TableRow,
        {
          "data-state": row.getIsSelected() && "selected",
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { children: renderCell(row, cell) }, cell.id))
        },
        row.id
      )) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: columns.length, className: "h-24 text-center", children: "No results." }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(DataTablePagination, { table })
  ] });
}

const defaultActions = {
  view: (onView) => ({ id: "view", label: "Ver detalles", icon: Eye, onClick: onView }),
  edit: (onEdit) => ({ id: "edit", label: "Editar", icon: Edit, onClick: onEdit }),
  copy: (onCopy) => ({ id: "copy", label: "Duplicar", icon: Copy, onClick: onCopy }),
  archive: (onArchive) => ({ id: "archive", label: "Archivar", icon: Archive, onClick: onArchive }),
  delete: (onDelete) => ({ id: "delete", label: "Eliminar", icon: Trash2, onClick: onDelete, variant: "destructive" })
};
function ActionsMenu({ row, actions = [], menuLabel = "Acciones" }) {
  if (!actions.length) return null;
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", className: "h-8 w-8 p-0", children: [
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Abrir men\xFA" }),
      /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" })
    ] }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", className: "w-[160px]", children: [
      /* @__PURE__ */ jsx(DropdownMenuLabel, { children: menuLabel }),
      /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
      actions.map((action) => {
        const isDisabled = typeof action.disabled === "function" ? action.disabled(row) : action.disabled;
        return /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => !isDisabled && action.onClick(row), disabled: isDisabled, className: action.variant === "destructive" ? "text-destructive focus:text-destructive" : "", children: [
          /* @__PURE__ */ jsx(action.icon, { className: "mr-2 h-4 w-4" }),
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
    cell: ({ row }) => /* @__PURE__ */ jsx(ActionsMenu, { row: row.original, actions: options.actions, menuLabel: options.menuLabel })
  };
}
const defaultActionsColumnConfig = { id: "actions", width: 50, menuLabel: "Acciones" };

function CommandPaletteExample() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: () => setOpen(true), className: "gap-2", children: [
      "\u2318K ",
      /* @__PURE__ */ jsx("span", { className: "text-xs opacity-70", children: "(o Ctrl+K)" })
    ] }),
    /* @__PURE__ */ jsxs(CommandDialog, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsx(CommandInput, { placeholder: "Buscar comando..." }),
      /* @__PURE__ */ jsxs(CommandList, { children: [
        /* @__PURE__ */ jsx(CommandEmpty, { children: "Sin resultados." }),
        /* @__PURE__ */ jsxs(CommandGroup, { heading: "Navegaci\xF3n", children: [
          /* @__PURE__ */ jsx(CommandItem, { onSelect: () => alert("Ir a inicio"), children: "Inicio" }),
          /* @__PURE__ */ jsx(CommandItem, { onSelect: () => alert("Ir a reportes"), children: "Reportes" })
        ] }),
        /* @__PURE__ */ jsx(CommandSeparator, {}),
        /* @__PURE__ */ jsxs(CommandGroup, { heading: "Acciones", children: [
          /* @__PURE__ */ jsx(CommandItem, { onSelect: () => alert("Crear registro"), children: "Crear registro" }),
          /* @__PURE__ */ jsx(CommandItem, { onSelect: () => alert("Exportar"), children: "Exportar" })
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
const ChartContext = React.createContext(null);
function useChart() {
  const c = React.useContext(ChartContext);
  if (!c) throw new Error("useChart must be used within a <ChartContainer />");
  return c;
}
const ChartContainer = React.forwardRef(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  return /* @__PURE__ */ jsx(ChartContext.Provider, { value: { config }, children: /* @__PURE__ */ jsxs(
    "div",
    {
      "data-chart": chartId,
      ref,
      role: "img",
      "aria-label": props["aria-label"] || "Chart visualization",
      className: cn("flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke=#ccc]]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke=#fff]]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke=#ccc]]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke=#ccc]]:stroke-border [&_.recharts-sector[stroke=#fff]]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(ChartStyle, { id: chartId, config }),
        /* @__PURE__ */ jsx(RechartsPrimitive.ResponsiveContainer, { children })
      ]
    }
  ) });
});
ChartContainer.displayName = "Chart";
const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(([, c]) => c.theme || c.color);
  if (!colorConfig.length) return null;
  return /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: Object.entries(THEMES).map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, cfg]) => {
    var _a;
    const color = ((_a = cfg.theme) == null ? void 0 : _a[theme]) || cfg.color;
    return color ? `  --color-${key}: ${color};` : null;
  }).join("\n")}
}`).join("\n") } });
};
const ChartTooltip = RechartsPrimitive.Tooltip;
const ChartTooltipContent = React.forwardRef(
  ({ active, payload, className, indicator = "dot", hideLabel = false, hideIndicator = false, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey }, ref) => {
    const { config } = useChart();
    const tooltipLabel = React.useMemo(() => {
      var _a;
      if (hideLabel || !(payload == null ? void 0 : payload.length)) return null;
      const [item] = payload;
      const key = `${labelKey || item.dataKey || item.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value = !labelKey && typeof label === "string" ? ((_a = config[label]) == null ? void 0 : _a.label) || label : itemConfig == null ? void 0 : itemConfig.label;
      if (labelFormatter) return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: labelFormatter(value, payload) });
      if (!value) return null;
      return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: value });
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);
    if (!active || !(payload == null ? void 0 : payload.length)) return null;
    const nestLabel = payload.length === 1 && indicator !== "dot";
    return /* @__PURE__ */ jsxs("div", { ref, className: cn("grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl", className), children: [
      !nestLabel ? tooltipLabel : null,
      /* @__PURE__ */ jsx("div", { className: "grid gap-1.5", children: payload.map((item, index) => {
        var _a;
        const key = `${nameKey || item.name || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        const indicatorColor = color || ((_a = item.payload) == null ? void 0 : _a.fill) || item.color;
        return /* @__PURE__ */ jsx("div", { className: cn("flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground", indicator === "dot" && "items-center"), children: formatter && (item == null ? void 0 : item.value) !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ jsxs(Fragment, { children: [
          (itemConfig == null ? void 0 : itemConfig.icon) ? /* @__PURE__ */ jsx(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ jsx("div", { className: cn("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]", { "h-2.5 w-2.5": indicator === "dot", "w-1": indicator === "line", "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed", "my-0.5": nestLabel && indicator === "dashed" }), style: { ["--color-bg"]: indicatorColor, ["--color-border"]: indicatorColor } }),
          /* @__PURE__ */ jsxs("div", { className: cn("flex flex-1 justify-between leading-none", nestLabel ? "items-end" : "items-center"), children: [
            /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
              nestLabel ? tooltipLabel : null,
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: (itemConfig == null ? void 0 : itemConfig.label) || item.name })
            ] }),
            item.value && /* @__PURE__ */ jsx("span", { className: "font-mono font-medium tabular-nums text-foreground", children: item.value.toLocaleString() })
          ] })
        ] }) }, item.dataKey);
      }) })
    ] });
  }
);
ChartTooltipContent.displayName = "ChartTooltip";
const ChartLegend = RechartsPrimitive.Legend;
const ChartLegendContent = React.forwardRef(
  ({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
    const { config } = useChart();
    if (!(payload == null ? void 0 : payload.length)) return null;
    return /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className), children: payload.map((item) => {
      const key = `${nameKey || item.dataKey || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      return /* @__PURE__ */ jsxs("div", { className: cn("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"), children: [
        (itemConfig == null ? void 0 : itemConfig.icon) && !hideIcon ? /* @__PURE__ */ jsx(itemConfig.icon, {}) : /* @__PURE__ */ jsx("div", { className: "h-2 w-2 shrink-0 rounded-[2px]", style: { backgroundColor: item.color } }),
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
}) => /* @__PURE__ */ jsx(ChartContainer, { config, className: cn("w-full", className), style: { height }, children: /* @__PURE__ */ jsxs(LineChart, { data, margin: { top: 8, right: 12, left: 12, bottom: 8 }, children: [
  grid && /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", className: "stroke-border/40" }),
  /* @__PURE__ */ jsx(XAxis, { dataKey: "category", tickLine: false, axisLine: false, tickMargin: 8 }),
  /* @__PURE__ */ jsx(YAxis, { width: 40, tickLine: false, axisLine: false, tickMargin: 4 }),
  /* @__PURE__ */ jsx(ChartTooltip, { content: /* @__PURE__ */ jsx(ChartTooltipContent, {}), ...tooltipProps }),
  /* @__PURE__ */ jsx(ChartLegend, { content: /* @__PURE__ */ jsx(ChartLegendContent, {}) }),
  referenceLines.map((r, i) => /* @__PURE__ */ jsx(ReferenceLine, { ...r, stroke: r.stroke || "hsl(var(--muted-foreground))" }, i)),
  lines.map((l, i) => {
    var _a;
    return /* @__PURE__ */ jsx(Line, { type: l.type || "monotone", dataKey: l.dataKey, stroke: l.stroke || `var(--color-${l.dataKey})`, strokeWidth: l.strokeWidth || 2, dot: (_a = l.dot) != null ? _a : false, activeDot: { r: 5 } }, i);
  }),
  areaUnder && lines.length === 1 && /* @__PURE__ */ jsx(Area, { dataKey: lines[0].dataKey, type: "monotone", stroke: "none", fill: `var(--color-${lines[0].dataKey})`, fillOpacity: 0.15 })
] }) });
const SimpleLineChart = ({ data }) => /* @__PURE__ */ jsx(BaseLineChart, { data, config: { value: { label: "Valor", color: chartColor(0) } }, lines: [{ dataKey: "value", stroke: chartColor(0) }], areaUnder: true });
const MultiLineChart = ({ data, series }) => {
  const config = series.reduce((acc, key, idx) => {
    acc[key] = { label: key, color: chartColor(idx) };
    return acc;
  }, {});
  return /* @__PURE__ */ jsx(BaseLineChart, { data, config, lines: series.map((s, i) => ({ dataKey: s, dot: false, stroke: chartColor(i) })), grid: true });
};
const LineChartWithReference = ({ data, referenceY }) => /* @__PURE__ */ jsx(BaseLineChart, { data, config: { value: { label: "Valor", color: chartColor(0) } }, lines: [{ dataKey: "value", dot: true, stroke: chartColor(0) }], referenceLines: [{ y: referenceY, stroke: chartColor(1), strokeDasharray: "4 4", label: `Meta ${referenceY}` }] });
const BaseBarChart = ({ data, bars, config, height = 300, grid = true, stacked = false, tooltipProps, className }) => /* @__PURE__ */ jsx(ChartContainer, { config, className: cn("w-full", className), style: { height }, children: /* @__PURE__ */ jsxs(BarChart, { data, margin: { top: 8, right: 12, left: 12, bottom: 8 }, children: [
  grid && /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", className: "stroke-border/40" }),
  /* @__PURE__ */ jsx(XAxis, { dataKey: "category", tickLine: false, axisLine: false, tickMargin: 8 }),
  /* @__PURE__ */ jsx(YAxis, { width: 40, tickLine: false, axisLine: false, tickMargin: 4 }),
  /* @__PURE__ */ jsx(ChartTooltip, { content: /* @__PURE__ */ jsx(ChartTooltipContent, {}), ...tooltipProps }),
  /* @__PURE__ */ jsx(ChartLegend, { content: /* @__PURE__ */ jsx(ChartLegendContent, {}) }),
  bars.map((b, i) => {
    var _a;
    return /* @__PURE__ */ jsx(Bar, { dataKey: b.dataKey, fill: b.fill || `var(--color-${b.dataKey})`, stackId: stacked ? b.stackId || "stack" : b.stackId, radius: (_a = b.radius) != null ? _a : 4 }, i);
  })
] }) });
const SimpleBarChart = ({ data }) => /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(BaseBarChart, { data, config, bars: series.map((s, i) => ({ dataKey: s, fill: chartColor(i) })), stacked: true });
};
const SimpleAreaChart = ({ data }) => /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(ChartContainer, { config: cfg, className: cn("w-full", className), style: { height }, children: /* @__PURE__ */ jsxs(PieChart, { children: [
    /* @__PURE__ */ jsx(Pie, { data, dataKey: "value", nameKey: "name", innerRadius, outerRadius, paddingAngle: 2, stroke: "none", children: data.map((d, i) => /* @__PURE__ */ jsx(Cell, { fill: d.fill || chartColor(i) }, i)) }),
    /* @__PURE__ */ jsx(ChartTooltip, { content: /* @__PURE__ */ jsx(ChartTooltipContent, {}) })
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
  return /* @__PURE__ */ jsx(ChartContainer, { config, className: cn("w-full", className), style: { height }, children: /* @__PURE__ */ jsxs(ScatterChart, { margin: { top: 8, right: 12, bottom: 8, left: 12 }, children: [
    /* @__PURE__ */ jsx(XAxis, { dataKey: "x", type: "number", tickLine: false, axisLine: false }),
    /* @__PURE__ */ jsx(YAxis, { dataKey: "y", type: "number", tickLine: false, axisLine: false }),
    showZ && /* @__PURE__ */ jsx(ZAxis, { dataKey: "z", range: [40, 400] }),
    /* @__PURE__ */ jsx(ChartTooltip, { content: /* @__PURE__ */ jsx(ChartTooltipContent, {}) }),
    Object.entries(groups).map(([k, vals], i) => /* @__PURE__ */ jsx(Scatter, { name: k, data: vals, fill: chartColor(i) }, k))
  ] }) });
};
const SimpleRadarChart = ({ data, series, height = 300, className }) => {
  const config = series.reduce((acc, s, i) => {
    acc[s] = { label: s, color: chartColor(i) };
    return acc;
  }, {});
  return /* @__PURE__ */ jsx(ChartContainer, { config, className: cn("w-full", className), style: { height }, children: /* @__PURE__ */ jsxs(RadarChart, { data, children: [
    /* @__PURE__ */ jsx(PolarGrid, {}),
    /* @__PURE__ */ jsx(PolarAngleAxis, { dataKey: "subject" }),
    /* @__PURE__ */ jsx(PolarRadiusAxis, {}),
    series.map((s, i) => /* @__PURE__ */ jsx(Radar, { dataKey: s, stroke: chartColor(i), fill: chartColor(i), fillOpacity: 0.2 }, s)),
    /* @__PURE__ */ jsx(ChartTooltip, { content: /* @__PURE__ */ jsx(ChartTooltipContent, {}) })
  ] }) });
};
const SimpleHeatmap = ({ data, height = 300, className }) => {
  const config = data.reduce((acc, d, i) => {
    acc[d.name] = { label: d.name, color: d.fill || chartColor(i) };
    return acc;
  }, {});
  return /* @__PURE__ */ jsx(ChartContainer, { config, className: cn("w-full", className), style: { height }, children: /* @__PURE__ */ jsx(Treemap, { data: data.map((d, i) => ({ ...d, fill: d.fill || chartColor(i) })), dataKey: "value", stroke: "var(--background)", fill: "transparent" }) });
};
const HeatmapChart = ({ data, xKeys, yKeys, height = 320, className, colors = { from: chartColor(0).replace(/\)$/, " / 0.15)"), to: chartColor(0) }, valueFormatter, gap = 0, showCellValues = true, showAxes = false }) => {
  const [hover, setHover] = React__default.useState(null);
  const xs = xKeys || Array.from(new Set(data.map((d) => d.x)));
  const ys = yKeys || Array.from(new Set(data.map((d) => d.y)));
  const max = Math.max(...data.map((d) => d.value)) || 1;
  const min = Math.min(...data.map((d) => d.value)) || 0;
  const cfg = { value: { label: "Valor", color: "hsl(var(--primary))" } };
  function cellColor(v) {
    if (max === min) return colors.to;
    const ratio = (v - min) / (max - min);
    if (colors.to.startsWith("hsl(") && colors.from.includes("/")) {
      const base = colors.to.replace(/\)$/, "");
      return base + ` / ${0.15 + ratio * 0.85})`;
    }
    return colors.to;
  }
  return /* @__PURE__ */ jsx(ChartContainer, { config: cfg, className: cn("w-full", className), style: { height }, children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative w-full h-full flex items-center justify-center p-4 overflow-hidden",
      onMouseLeave: () => setHover(null),
      onMouseMove: (e) => {
        const container = e.currentTarget;
        const bounds = container.getBoundingClientRect();
        const relX = e.clientX - bounds.left;
        const relY = e.clientY - bounds.top;
        const cw = bounds.width / xs.length;
        const ch = bounds.height / ys.length;
        const xi = Math.floor(relX / cw), yi = Math.floor(relY / ch);
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
        setHover({ x, y, value: cell.value, cx: (xi + 0.5) * cw, cy: (yi + 0.5) * ch });
      },
      children: [
        /* @__PURE__ */ jsx("svg", { width: "100%", height: "100%", preserveAspectRatio: "xMidYMid meet", viewBox: `0 0 ${xs.length} ${ys.length}`, children: ys.map((y, yi) => /* @__PURE__ */ jsx("g", { children: xs.map((x, xi) => {
          var _a;
          const cell = data.find((d) => d.x === x && d.y === y);
          const v = (_a = cell == null ? void 0 : cell.value) != null ? _a : 0;
          const isActive = hover && hover.x === x && hover.y === y;
          const g = Math.min(Math.max(gap, 0), 0.9);
          const off = g / 2;
          const size = 1 - g;
          return /* @__PURE__ */ jsx("rect", { x: xi + off, y: yi + off, width: size, height: size, fill: cellColor(v), rx: 0.12, stroke: isActive ? "hsl(var(--foreground))" : "none", strokeWidth: isActive ? 0.04 : 0 }, `${x}-${y}`);
        }) }, `row-${y}`)) }),
        showCellValues && /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 grid", style: { gridTemplateColumns: `repeat(${xs.length}, 1fr)`, gridTemplateRows: `repeat(${ys.length}, 1fr)` }, children: ys.map((y, yi) => /* @__PURE__ */ jsx(React__default.Fragment, { children: xs.map((x, xi) => {
          var _a;
          const cell = data.find((d) => d.x === x && d.y === y);
          const v = (_a = cell == null ? void 0 : cell.value) != null ? _a : 0;
          return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center text-[10px] font-medium text-foreground/70", children: valueFormatter ? valueFormatter(v) : v }, `label-${x}-${y}`);
        }) }, `labels-row-${y}`)) }),
        showAxes && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "absolute left-0 right-0 bottom-0 translate-y-full mt-2 grid text-[10px] font-medium text-muted-foreground", style: { gridTemplateColumns: `repeat(${xs.length}, 1fr)` }, "aria-label": "Eje X", children: xs.map((x) => /* @__PURE__ */ jsx("div", { className: "text-center truncate px-1", children: String(x) }, `x-${x}`)) }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 bottom-0 -translate-x-full mr-2 flex flex-col justify-center gap-1", "aria-label": "Eje Y", children: ys.map((y) => /* @__PURE__ */ jsx("div", { className: "text-[10px] font-medium text-muted-foreground h-full flex items-center justify-end pr-1", style: { height: `calc(100% / ${ys.length})` }, children: String(y) }, `y-${y}`)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "absolute top-1 left-1 flex gap-2 text-[10px] text-muted-foreground", children: [
          /* @__PURE__ */ jsx("span", { children: min }),
          /* @__PURE__ */ jsx("span", { className: "bg-border/40 h-px w-8 self-center" }),
          /* @__PURE__ */ jsx("span", { children: max })
        ] }),
        hover && /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md border bg-popover px-2 py-1 text-[10px] shadow-md", style: { left: hover.cx, top: hover.cy }, children: [
          /* @__PURE__ */ jsx("div", { className: "font-medium", children: valueFormatter ? valueFormatter(hover.value) : hover.value }),
          /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground", children: [
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

export { ActionsMenu, Badge, BaseBarChart, BaseLineChart, Button, Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandPaletteExample, CommandSeparator, CommandShortcut, DataTable, DataTableFacetedFilter, DataTablePagination, DataTableToolbar, DataTableViewOptions, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, DonutChart, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, FORMATTERS, HeatmapChart, Input, LineChartWithReference, MultiLineChart, Popover, PopoverContent, PopoverTrigger, ScatterPointsChart, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue, Separator, SimpleAreaChart, SimpleBarChart, SimpleHeatmap, SimpleLineChart, SimpleRadarChart, StackedBarChart, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, applyTemplate, badgeVariants, buttonVariants, createActionsColumn, createCustomFormatter, defaultActions, defaultActionsColumnConfig, formatCell };
//# sourceMappingURL=index.mjs.map
