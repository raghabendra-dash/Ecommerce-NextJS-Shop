import * as React from "react";
import { cn } from "@/lib/utils";
import { useFormField } from "./form";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  let error = false;
  try {
    const formField = useFormField();
    error = !!formField.error;
  } catch (e) {}

  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive",
        className
      )}
      ref={ref}
      aria-invalid={error}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
