import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-black transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#073B35] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer active:translate-x-0.5 active:translate-y-0.5',
  {
    variants: {
      variant: {
        default:
          'bg-[#E3A92F] hover:bg-[#d89c25] text-[#073B35] border-2 border-[#073B35] shadow-[4px_4px_0px_#073B35] active:shadow-[2px_2px_0px_#073B35]',
        gold:
          'bg-[#E3A92F] hover:bg-[#d89c25] text-[#073B35] border-2 border-[#073B35] shadow-[4px_4px_0px_#073B35] active:shadow-[2px_2px_0px_#073B35]',
        secondary:
          'bg-[#0B5F55] hover:bg-[#073B35] text-white border-2 border-[#073B35] shadow-[4px_4px_0px_#073B35] active:shadow-[2px_2px_0px_#073B35]',
        outline:
          'bg-white hover:bg-[#F6F1E7] text-[#073B35] border-2 border-[#073B35] shadow-[3px_3px_0px_#073B35] active:shadow-[1px_1px_0px_#073B35]',
        ghost:
          'hover:bg-[#073B35]/10 text-[#073B35] border-2 border-transparent active:translate-x-0 active:translate-y-0 shadow-none',
        destructive:
          'bg-[#C8362B] text-white hover:bg-[#af281f] border-2 border-[#073B35] shadow-[4px_4px_0px_#073B35] active:shadow-[2px_2px_0px_#073B35]',
        success:
          'bg-emerald-600 text-white hover:bg-emerald-700 border-2 border-[#073B35] shadow-[4px_4px_0px_#073B35] active:shadow-[2px_2px_0px_#073B35]',
        link:
          'text-[#073B35] underline-offset-4 hover:underline p-0 h-auto font-bold border-none shadow-none active:translate-x-0 active:translate-y-0',
      },
      size: {
        default: 'h-11 px-5 py-2.5 text-sm',
        sm: 'h-9 px-3.5 py-1 text-xs rounded-xl shadow-[3px_3px_0px_#073B35] active:shadow-[1px_1px_0px_#073B35]',
        lg: 'h-12 px-7 py-3 text-base font-black shadow-[4px_4px_0px_#073B35] active:shadow-[2px_2px_0px_#073B35]',
        icon: 'h-10 w-10 p-0 rounded-xl shadow-[3px_3px_0px_#073B35] active:shadow-[1px_1px_0px_#073B35]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ms-1 me-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
