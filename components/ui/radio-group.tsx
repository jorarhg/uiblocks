"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  /** Layout visual */
  layout?: 'stack' | 'inline'
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, layout = 'stack', ...props }, ref) => {
  const layoutClasses = layout === 'inline' ? 'flex flex-wrap items-center gap-3' : 'grid gap-2'
  return (
    <RadioGroupPrimitive.Root
      className={cn(layoutClasses, className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

export interface RadioItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  /** Variante visual del indicador interno */
  indicatorVariant?: 'dot' | 'ring' | 'fill'
  /** Tamaño del control */
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioItemProps
>(({ className, indicatorVariant='dot', size='md', ...props }, ref) => {
  const outerSize: Record<typeof size, string> = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-7 w-7'
  }
  const innerBaseSize: Record<typeof size, {dot: string; fill: string; ring: string}> = {
    sm: { dot: 'h-2 w-2', fill: 'h-2 w-2', ring: 'h-3 w-3' },
    md: { dot: 'h-3 w-3', fill: 'h-3 w-3', ring: 'h-4 w-4' },
    lg: { dot: 'h-3.5 w-3.5', fill: 'h-3.5 w-3.5', ring: 'h-5 w-5' },
    xl: { dot: 'h-4 w-4', fill: 'h-4 w-4', ring: 'h-5.5 w-5.5' }
  }
  const innerSizeClass = indicatorVariant === 'ring'
    ? innerBaseSize[size].ring
    : indicatorVariant === 'fill'
      ? innerBaseSize[size].fill
      : innerBaseSize[size].dot
  return (
  <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        // Base con borde atenuado y group para controlar hijo
        `group peer inline-flex ${outerSize[size]} items-center justify-center rounded-full border-2 border-primary/70 data-[state=checked]:border-primary bg-background text-primary transition-colors duration-200 hover:border-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:cursor-not-allowed disabled:opacity-50`,
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        className={cn(
          "flex items-center justify-center text-current transition-transform duration-200 data-[state=unchecked]:scale-50 data-[state=checked]:scale-100 opacity-0 data-[state=checked]:opacity-100"
        )}
      >
        {indicatorVariant === 'dot' && (
          <span className="flex items-center justify-center h-full w-full">
            <span className={cn("rounded-full bg-primary animate-radio-pop", innerSizeClass)} />
          </span>
        )}
        {indicatorVariant === 'ring' && <Circle className="h-4 w-4" />}
        {indicatorVariant === 'fill' && (
          <span className="flex items-center justify-center h-full w-full">
            <span className={cn("rounded-full bg-primary animate-radio-pop", innerSizeClass)} />
          </span>
        )}
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
