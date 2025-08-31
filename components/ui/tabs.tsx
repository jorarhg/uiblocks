"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
type ListVariant = 'default' | 'ghost' | 'outline'
type TriggerSize = 'sm' | 'md' | 'lg'
type TriggerVariant = 'default' | 'underline' | 'pill'

const Tabs = TabsPrimitive.Root

interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  justify?: Justify
  variant?: ListVariant
  fullWidth?: boolean
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, justify='start', variant='default', fullWidth=false, ...props }, ref) => {
  const justifyClass = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  }[justify]
  const variantClass = {
    default: 'bg-muted',
    ghost: 'bg-transparent',
    outline: 'bg-muted border border-border'
  }[variant]
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center rounded-md p-1 text-muted-foreground gap-1",
        variantClass,
        justifyClass,
        fullWidth && 'w-full',
        className
      )}
      {...props}
    />
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  size?: TriggerSize
  variant?: TriggerVariant
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, size='md', variant='default', ...props }, ref) => {
  const sizeClass = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-sm'
  }[size]
  const variantBase = 'inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
  const variantClass = {
    default: 'rounded-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
    underline: 'rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-foreground',
    pill: 'rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
  }[variant]
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        variantBase,
        sizeClass,
        variantClass,
        className
      )}
      {...props}
    />
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
