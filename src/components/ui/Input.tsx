import { forwardRef, InputHTMLAttributes } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightElement?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightElement, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full rounded-lg border bg-white text-sm text-slate-800 placeholder:text-slate-400
              transition-all duration-150 outline-none
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
              ${error ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-slate-300'}
              ${leftIcon ? 'pl-10' : 'pl-3'}
              ${rightElement ? 'pr-10' : 'pr-3'}
              py-2 h-9
              ${className}
            `}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              {rightElement}
            </div>
          )}
          {error && !rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <ExclamationCircleIcon className="w-4 h-4 text-red-400" />
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-1.5 text-xs text-slate-400">{hint}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
