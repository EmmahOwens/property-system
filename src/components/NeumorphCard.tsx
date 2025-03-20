
import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes, ReactNode } from "react";

interface NeumorphCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  inset?: boolean;
}

const NeumorphCard = forwardRef<HTMLDivElement, NeumorphCardProps>(
  ({ className, children, inset = false, ...props }, ref) => {
    return (
      <div
        className={cn(
          inset ? "neumorph-inset" : "neumorph",
          "overflow-hidden p-6 transition-all duration-300",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NeumorphCard.displayName = "NeumorphCard";

export { NeumorphCard };
