import * as React from "react";
import { cn } from "@/lib/utils";

interface AlertMessageProps {
  variant: "error" | "success" | "warning" | "info";
  message: string;
  className?: string;
}

const variantClasses: Record<AlertMessageProps["variant"], string> = {
  error: "bg-red-50 border-red-200 text-red-700",
  success: "bg-green-50 border-green-200 text-green-700",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-700",
  info: "bg-blue-50 border-blue-200 text-blue-700",
};

export function AlertMessage({ variant, message, className }: AlertMessageProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-md border px-4 py-3 text-sm",
        variantClasses[variant],
        className
      )}
    >
      {message}
    </div>
  );
}
