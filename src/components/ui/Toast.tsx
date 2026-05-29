import { useEffect } from 'react'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { removeToast, Toast, ToastType } from './toastSlice'

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircleIcon className="w-5 h-5 text-emerald-500" />,
  error: <ExclamationCircleIcon className="w-5 h-5 text-red-500" />,
  warning: <ExclamationTriangleIcon className="w-5 h-5 text-amber-500" />,
  info: <InformationCircleIcon className="w-5 h-5 text-blue-500" />,
}

const styles: Record<ToastType, string> = {
  success: 'border-l-4 border-emerald-500',
  error: 'border-l-4 border-red-500',
  warning: 'border-l-4 border-amber-500',
  info: 'border-l-4 border-blue-500',
}

function ToastItem({ toast }: { toast: Toast }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const timer = setTimeout(() => dispatch(removeToast(toast.id)), 4000)
    return () => clearTimeout(timer)
  }, [toast.id, dispatch])

  return (
    <div
      className={`flex items-start gap-3 bg-white rounded-lg shadow-lg p-4 min-w-72 max-w-sm animate-in slide-in-from-right-4 ${styles[toast.type]}`}
    >
      <div className="shrink-0 mt-0.5">{icons[toast.type]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800">{toast.title}</p>
        {toast.message && (
          <p className="text-sm text-slate-500 mt-0.5">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => dispatch(removeToast(toast.id))}
        className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </div>
  )
}

export default function ToastContainer() {
  const toasts = useAppSelector((s) => s.toast.toasts)

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  )
}
