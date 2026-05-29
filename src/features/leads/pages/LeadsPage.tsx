import { useEffect, useState } from 'react'
import { FunnelIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { fetchLeads, deleteLead } from '../store/leadsSlice'
import { Lead } from '../types'
import ConfirmModal from '@/components/ui/ConfirmModal'
import Button from '@/components/ui/Button'
import { useToast } from '@/hooks/useToast'

const stageConfig: Record<Lead['stage'], { label: string; color: string }> = {
  new:       { label: 'Mới', color: 'bg-slate-100 text-slate-600' },
  contacted: { label: 'Đã liên hệ', color: 'bg-blue-100 text-blue-700' },
  qualified: { label: 'Đủ điều kiện', color: 'bg-violet-100 text-violet-700' },
  proposal:  { label: 'Đề xuất', color: 'bg-amber-100 text-amber-700' },
  won:       { label: 'Thành công', color: 'bg-emerald-100 text-emerald-700' },
  lost:      { label: 'Thất bại', color: 'bg-red-100 text-red-600' },
}

export default function LeadsPage() {
  const dispatch = useAppDispatch()
  const toast = useToast()
  const { items, loading } = useAppSelector((s) => s.leads)
  const [deleteTarget, setDeleteTarget] = useState<Lead | null>(null)

  useEffect(() => { dispatch(fetchLeads()) }, [dispatch])

  const handleDelete = async () => {
    if (!deleteTarget) return
    await dispatch(deleteLead(deleteTarget.id))
    toast.success('Đã xóa lead', deleteTarget.name)
    setDeleteTarget(null)
  }

  const totalValue = items.reduce((sum, l) => sum + (l.value || 0), 0)

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <FunnelIcon className="w-5 h-5 text-violet-600" />
            Leads
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {items.length} leads · Tổng giá trị:{' '}
            {totalValue.toLocaleString('vi-VN')}₫
          </p>
        </div>
        <Button leftIcon={<PlusIcon className="w-4 h-4" />}>Thêm lead</Button>
      </div>

      {/* Kanban-style stage summary */}
      <div className="grid grid-cols-6 gap-3 mb-6">
        {(Object.keys(stageConfig) as Lead['stage'][]).map((stage) => {
          const count = items.filter((l) => l.stage === stage).length
          const { label, color } = stageConfig[stage]
          return (
            <div key={stage} className="bg-white border border-slate-200 rounded-xl p-3 text-center shadow-sm">
              <div className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium mb-1 ${color}`}>
                {label}
              </div>
              <div className="text-2xl font-bold text-slate-800">{count}</div>
            </div>
          )
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {['Tên', 'Email', 'Nguồn', 'Giai đoạn', 'Giá trị', ''].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading && items.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-slate-400">Đang tải...</td></tr>
            ) : (
              items.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800">{l.name}</td>
                  <td className="px-4 py-3 text-slate-600">{l.email}</td>
                  <td className="px-4 py-3 text-slate-500 capitalize">{l.source}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${stageConfig[l.stage].color}`}>
                      {stageConfig[l.stage].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {l.value ? l.value.toLocaleString('vi-VN') + '₫' : '—'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setDeleteTarget(l)}
                      className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Xóa lead"
        description={`Xóa "${deleteTarget?.name}"?`}
        loading={loading}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  )
}
