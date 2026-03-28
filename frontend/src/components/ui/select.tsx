import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = React.forwardRef<
  HTMLSelectElement,
  React.HTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full">
    <select
      ref={ref}
      className={cn(
        "flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
    <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 opacity-50" />
  </div>
))
Select.displayName = "Select"

// Minimal exports for compatibility with component patterns
const SelectContent = ({ children, ...props }: any) => <>{children}</>
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef<HTMLOptionElement, any>(({ children, ...props }, ref) => (
  <option {...props}>{children}</option>
))
SelectItem.displayName = "SelectItem"

const SelectTrigger = ({ children }: any) => <>{children}</>
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = ({ placeholder }: any) => <option value="">{placeholder}</option>
SelectValue.displayName = "SelectValue"

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
