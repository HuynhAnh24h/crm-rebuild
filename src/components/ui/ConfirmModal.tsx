import { useEffect, useRef } from 'react'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from './Button'

export interface ConfirmModalProps {
  open: boolean
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'primary'
  loading?: boolean
  onConfirm: () => void
  onClose: () => void
}

export default function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading = false,
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  // Focus trap & ESC close
  useEffect(() => {
    if (!open) return
    cancelRef.current?.focus()
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        <div className="flex gap-4">
          <div
            className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
              variant === 'danger' ? 'bg-red-100' : 'bg-blue-100'
            }`}
          >
            <ExclamationTriangleIcon
              className={`w-5 h-5 ${variant === 'danger' ? 'text-red-600' : 'text-blue-600'}`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-slate-800">{title}</h3>
            {description && (
              <p className="mt-1 text-sm text-slate-500">{description}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button ref={cancelRef} variant="outline" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant={variant} loading={loading} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
