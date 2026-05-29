import { useEffect, useState } from 'react'
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '@/app/store'
import {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  setSelected,
} from '../store/customersSlice'
import { Customer, CustomerFormData } from '../types'
import CustomerForm from '../components/CustomerForm'
import StatusBadge from '../components/StatusBadge'
import ConfirmModal from '@/components/ui/ConfirmModal'
import Button from '@/components/ui/Button'
import { useToast } from '@/hooks/useToast'

export default function CustomersPage() {
  const dispatch = useAppDispatch()
  const toast = useToast()
  const { items, loading, selectedCustomer } = useAppSelector((s) => s.customers)

  const [showForm, setShowForm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [dispatch])

  const filtered = items.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.company?.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => {
    dispatch(setSelected(null))
    setShowForm(true)
  }

  const openEdit = (c: Customer) => {
    dispatch(setSelected(c))
    setShowForm(true)
  }

  const handleSubmit = async (data: CustomerFormData) => {
    if (selectedCustomer) {
      await dispatch(updateCustomer({ id: selectedCustomer.id, data }))
      toast.success('Đã cập nhật', `${data.name} đã được cập nhật`)
    } else {
      await dispatch(createCustomer(data))
      toast.success('Đã thêm mới', `${data.name} đã được thêm vào danh sách`)
    }
    setShowForm(false)
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    await dispatch(deleteCustomer(deleteTarget.id))
    toast.success('Đã xóa', `${deleteTarget.name} đã được xóa`)
    setDeleteTarget(null)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <UserGroupIcon className="w-5 h-5 text-blue-600" />
            Khách hàng
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {items.length} khách hàng trong hệ thống
          </p>
        </div>
        <Button leftIcon={<PlusIcon className="w-4 h-4" />} onClick={openCreate}>
          Thêm khách hàng
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-4 max-w-xs">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm..."
          className="w-full pl-9 pr-3 py-2 h-9 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        {loading && items.length === 0 ? (
          <div className="flex items-center justify-center py-16 text-slate-400 text-sm">
            Đang tải...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <UserGroupIcon className="w-10 h-10 mb-2 opacity-40" />
            <p className="text-sm">Chưa có khách hàng nào</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {['Tên', 'Email', 'Công ty', 'Trạng thái', 'Ngày tạo', ''].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800">{c.name}</td>
                  <td className="px-4 py-3 text-slate-600">{c.email}</td>
                  <td className="px-4 py-3 text-slate-500">{c.company || '—'}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {new Date(c.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <button
                        onClick={() => openEdit(c)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <PencilSquareIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(c)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modals */}
      {showForm && (
        <CustomerForm
          customer={selectedCustomer}
          loading={loading}
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Xóa khách hàng"
        description={`Bạn có chắc muốn xóa "${deleteTarget?.name}"? Hành động này không thể hoàn tác.`}
        confirmLabel="Xóa"
        loading={loading}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  )
}
