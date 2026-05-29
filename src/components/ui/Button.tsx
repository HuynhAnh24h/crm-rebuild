import { ButtonHTMLAttributes, forwardRef } from 'react'


// Simple CVA-like utility (no extra dep needed)
type Variant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500 shadow-sm',
  secondary:
    'bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300 focus:ring-slate-400',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500 shadow-sm',
  ghost:
    'text-slate-600 hover:bg-slate-100 active:bg-slate-200 focus:ring-slate-400',
  outline:
    'border border-slate-300 text-slate-700 hover:bg-slate-50 active:bg-slate-100 focus:ring-slate-400',
}

const sizes: Record<Size, string> = {
  sm: 'text-xs px-3 py-1.5 h-8',
  md: 'text-sm px-4 py-2 h-9',
  lg: 'text-sm px-5 py-2.5 h-11',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
