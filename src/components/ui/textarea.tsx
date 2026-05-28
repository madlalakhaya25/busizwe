import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-lg border border-[#e0d9cc] bg-white px-4 py-3 text-sm text-[#1C1C1C] shadow-sm placeholder:text-[#9b9b9b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#014D4E] focus-visible:border-[#014D4E] disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
