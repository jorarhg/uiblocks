import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base estilos
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        dashed: "border border-dashed border-input bg-background hover:bg-accent/50 hover:text-accent-foreground",
        input: "h-auto rounded-md border border-input bg-background px-3 py-2 text-sm font-normal hover:border-primary focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary placeholder:text-muted-foreground",
        badge: "rounded-full bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1 text-xs font-medium",
        circle: "rounded-full bg-primary text-primary-foreground hover:bg-primary/90 p-0",
        full: "w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        circle: "size-10 p-0", // para variant circle si se usa size explicito
        xs: "h-8 rounded-md px-3 text-xs",
  input: "h-auto px-3 py-2", // usar junto a variant="input" para evitar colisión de alturas
      },
      tone: {
        // Permite reutilizar variante badge con otros tonos en el futuro (placeholder)
        default: "",
        neutral: "bg-muted text-muted-foreground hover:bg-muted/80",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  loading?: boolean
  loadingIcon?: React.ReactNode
  /** For icon-only buttons it's sometimes clearer pasar boolean explicito */
  iconOnly?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, tone, iconOnly, asChild = false, leftIcon, rightIcon, loading=false, loadingIcon, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    // Caso asChild: no inyectamos spans adicionales para no romper Slot (Children.only)
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, tone, className }), loading && 'cursor-progress')}
          ref={ref}
          disabled={disabled || loading}
          {...props}
        />
      )
    }
    const computedIconOnly = iconOnly || (!children && (leftIcon || rightIcon) && !loading)
    const spinner = <span className="animate-spin inline-block border-2 border-current border-t-transparent rounded-full w-4 h-4" />
    const showLeft = loading ? (loadingIcon ?? spinner) : leftIcon
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size: computedIconOnly ? (size === 'sm' ? 'icon' : 'icon') : size, tone, className }),
          loading && 'cursor-progress'
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {showLeft && !computedIconOnly && <span className="inline-flex items-center justify-center" data-slot="left-icon">{showLeft}</span>}
        {children && !computedIconOnly && <span className="inline-flex items-center" data-slot="label">{children}</span>}
        {computedIconOnly ? (
          // Si es icon only mostramos left o right prioritariamente
          showLeft ? showLeft : rightIcon
        ) : (
          !loading && rightIcon && <span className="inline-flex items-center justify-center" data-slot="right-icon">{rightIcon}</span>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
