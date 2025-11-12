import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
        {label && <span className="font-medium">{label}</span>}
        <select
          className={cn(
            "rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-200",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="text-xs text-red-500 mt-1">{error}</span>
        )}
      </label>
    );
  }
);
Select.displayName = "Select";

export { Select };

