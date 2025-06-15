import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

<<<<<<< HEAD

=======
>>>>>>> 79a5aeb627154f2166ede9729a97e68b8136b766
import { cn } from "../../lib/utils"

function Label({
  className, 
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
