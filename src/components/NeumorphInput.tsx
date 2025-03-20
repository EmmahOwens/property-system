
import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface NeumorphInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const NeumorphInput = forwardRef<HTMLInputElement, NeumorphInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2 w-full">
        {label && (
          <label className="font-medium text-sm text-foreground">{label}</label>
        )}
        <input
          className={cn(
            "input-neumorph",
            error && "border-2 border-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  }
);

NeumorphInput.displayName = "NeumorphInput";

export { NeumorphInput };
