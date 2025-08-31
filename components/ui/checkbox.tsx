"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check, X } from "lucide-react"

import { cn } from "@/lib/utils"

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /** Variante visual del icono interno */
  iconVariant?: 'check' | 'cross' | 'fill'
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, iconVariant='check', ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border-2 border-primary bg-background text-primary transition-all duration-200 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      iconVariant !== 'fill' && "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      iconVariant === 'fill' && "data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        "flex items-center justify-center text-current transition-all duration-150 data-[state=unchecked]:scale-0 data-[state=checked]:scale-100"
      )}
    >
      {iconVariant === 'check' && <Check className="h-5 w-5" />}
      {iconVariant === 'cross' && <X className="h-5 w-5" />}
      {iconVariant === 'fill' && (
        <span className="block h-3 w-3 rounded-sm bg-current" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
