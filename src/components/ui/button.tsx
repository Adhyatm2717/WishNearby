import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer",
  {
    variants: {
      variant: {
        default: "gradient-cta text-cta-foreground shadow-soft hover:brightness-105 hover:shadow-soft-lg hover:-translate-y-0.5",
        primary: "gradient-primary text-primary-foreground shadow-soft hover:brightness-110 hover:shadow-soft-lg hover:-translate-y-0.5",
        secondary: "bg-card text-foreground border border-navy/20 hover:bg-muted hover:border-navy/30 shadow-soft hover:-translate-y-0.5",
        ghost: "hover:bg-muted/80 hover:text-foreground",
        destructive: "bg-destructive text-white hover:bg-destructive/90 shadow-soft",
        outline: "border border-primary/30 text-primary bg-transparent hover:bg-primary/5 hover:border-primary/50",
        success: "gradient-cta text-cta-foreground shadow-soft hover:brightness-105 hover:-translate-y-0.5",
        premium: "gradient-gold text-gold-foreground shadow-soft hover:brightness-105 hover:shadow-soft-lg hover:-translate-y-0.5",
        link: "text-primary underline-offset-4 hover:underline",
        glass: "glass border border-white/20 text-foreground hover:bg-white/90 dark:hover:bg-white/10 shadow-soft",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-12 px-7 text-base rounded-xl",
        xl: "h-14 px-8 text-base rounded-2xl",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
