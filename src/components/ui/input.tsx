import * as React from "react";

import { cn } from "@/lib/utils";
import { useFormField } from "./form";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    let error = false;
    try {
      const formField = useFormField();
      error = !!formField.error;
    } catch (e) {}

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive",
          className
        )}
        ref={ref}
        aria-invalid={error}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
