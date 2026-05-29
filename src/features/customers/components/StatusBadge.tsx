import { CustomerStatus } from '../types'

const config: Record<CustomerStatus, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  prospect: { label: 'Prospect', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  inactive: { label: 'Inactive', className: 'bg-slate-100 text-slate-600 border-slate-200' },
}

export default function StatusBadge({ status }: { status: CustomerStatus }) {
  const { label, className } = config[status]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${className}`}>
      {label}
    </span>
  )
}
