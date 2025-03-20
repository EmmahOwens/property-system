
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NeumorphButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ugandan';
  size?: 'sm' | 'md' | 'lg';
}

const NeumorphButton = forwardRef<HTMLButtonElement, NeumorphButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "neumorph relative inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          {
            'text-primary-foreground bg-primary hover:bg-primary/90': variant === 'primary',
            'text-secondary-foreground bg-secondary hover:bg-secondary/90': variant === 'secondary',
            'text-ugandan-foreground bg-ugandan hover:bg-ugandan/90': variant === 'ugandan',
            'text-sm px-3 py-1.5 rounded-md': size === 'sm',
            'text-base px-4 py-2 rounded-lg': size === 'md',
            'text-lg px-6 py-3 rounded-xl': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

NeumorphButton.displayName = "NeumorphButton";

export { NeumorphButton };
