import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Customer, customerSchema, CustomerFormData } from '../types'
import { FormInput, FormSelect } from '@/components/form/FormField'
import Button from '@/components/ui/Button'

interface CustomerFormProps {
  customer?: Customer | null
  loading?: boolean
  onSubmit: (data: CustomerFormData) => void
  onClose: () => void
}

const statusOptions = [
  { value: 'active', label: '✅ Active' },
  { value: 'prospect', label: '🔵 Prospect' },
  { value: 'inactive', label: '⚫ Inactive' },
]

export default function CustomerForm({
  customer,
  loading,
  onSubmit,
  onClose,
}: CustomerFormProps) {
  const isEdit = !!customer

  const { control, handleSubmit, reset } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      status: 'prospect',
      note: '',
    },
  })

  useEffect(() => {
    if (customer) reset(customer)
  }, [customer, reset])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-base font-semibold text-slate-800">
            {isEdit ? 'Cập nhật khách hàng' : 'Thêm khách hàng mới'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="px-6 py-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormInput name="name" control={control} label="Họ và tên" placeholder="Nguyễn Văn A" required className="col-span-2" />
              <FormInput name="email" control={control} label="Email" type="email" placeholder="example@email.com" required />
              <FormInput name="phone" control={control} label="Số điện thoại" placeholder="0901 234 567" />
              <FormInput name="company" control={control} label="Công ty" placeholder="Tên công ty" />
              <FormSelect
                name="status"
                control={control}
                label="Trạng thái"
                options={statusOptions}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Ghi chú</label>
              {/* Textarea controlled manually */}
            </div>
          </div>

          <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200">
            <Button variant="outline" type="button" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" loading={loading}>
              {isEdit ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
