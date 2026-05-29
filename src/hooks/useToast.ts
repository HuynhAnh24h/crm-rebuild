import { useAppDispatch } from '@/app/store'
import { addToast, ToastType } from '@/components/ui/toastSlice'

export function useToast() {
  const dispatch = useAppDispatch()

  const toast = (type: ToastType, title: string, message?: string) => {
    dispatch(addToast({ type, title, message }))
  }

  return {
    success: (title: string, message?: string) => toast('success', title, message),
    error: (title: string, message?: string) => toast('error', title, message),
    warning: (title: string, message?: string) => toast('warning', title, message),
    info: (title: string, message?: string) => toast('info', title, message),
  }
}
