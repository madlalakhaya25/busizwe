import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-[#014D4E] text-white shadow-md hover:bg-[#013638] hover:shadow-lg focus-visible:ring-[#014D4E]',
        gold:
          'bg-[#C89B3C] text-white shadow-md hover:bg-[#A8832A] hover:shadow-lg focus-visible:ring-[#C89B3C]',
        'gold-outline':
          'border-2 border-[#C89B3C] text-[#C89B3C] bg-transparent hover:bg-[#C89B3C] hover:text-white focus-visible:ring-[#C89B3C]',
        outline:
          'border-2 border-[#014D4E] text-[#014D4E] bg-transparent hover:bg-[#014D4E] hover:text-white focus-visible:ring-[#014D4E]',
        ghost:
          'text-[#014D4E] hover:bg-[#014D4E]/10 focus-visible:ring-[#014D4E]',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
        secondary:
          'bg-[#F7F3EA] text-[#1C1C1C] border border-[#e0d9cc] hover:bg-[#ede8dc] focus-visible:ring-[#C89B3C]',
        link: 'text-[#014D4E] underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-11 px-6 py-2.5',
        sm: 'h-9 px-4 py-2 text-xs',
        lg: 'h-12 px-8 py-3 text-base',
        xl: 'h-14 px-10 py-3.5 text-base',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
