import { useAppSelector } from '@/app/store'
import {
  UserGroupIcon,
  FunnelIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline'

interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  icon: React.ReactNode
  color: string
}

function StatCard({ label, value, sub, icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
          {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const customers = useAppSelector((s) => s.customers.items)
  const leads = useAppSelector((s) => s.leads.items)
  const activeCustomers = customers.filter((c) => c.status === 'active').length
  const wonLeads = leads.filter((l) => l.stage === 'won').length
  const totalValue = leads.reduce((sum, l) => sum + (l.value || 0), 0)

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-0.5">Tổng quan hệ thống CRM</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Tổng khách hàng"
          value={customers.length}
          sub={`${activeCustomers} đang hoạt động`}
          icon={<UserGroupIcon className="w-5 h-5 text-blue-600" />}
          color="bg-blue-50"
        />
        <StatCard
          label="Tổng leads"
          value={leads.length}
          sub={`${wonLeads} đã chốt`}
          icon={<FunnelIcon className="w-5 h-5 text-violet-600" />}
          color="bg-violet-50"
        />
        <StatCard
          label="Doanh thu tiềm năng"
          value={`${(totalValue / 1_000_000).toFixed(1)}M₫`}
          icon={<CurrencyDollarIcon className="w-5 h-5 text-emerald-600" />}
          color="bg-emerald-50"
        />
        <StatCard
          label="Tỉ lệ chuyển đổi"
          value={leads.length ? `${Math.round((wonLeads / leads.length) * 100)}%` : '—'}
          icon={<ArrowTrendingUpIcon className="w-5 h-5 text-amber-600" />}
          color="bg-amber-50"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Khách hàng gần đây</h2>
          {customers.slice(0, 5).map((c) => (
            <div key={c.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-slate-700">{c.name}</p>
                <p className="text-xs text-slate-400">{c.email}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                c.status === 'active' ? 'bg-emerald-50 text-emerald-700' :
                c.status === 'prospect' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
              }`}>{c.status}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Pipeline leads</h2>
          {(['new','contacted','qualified','proposal','won','lost'] as const).map((stage) => {
            const count = leads.filter((l) => l.stage === stage).length
            const pct = leads.length ? Math.round((count / leads.length) * 100) : 0
            return (
              <div key={stage} className="mb-2.5">
                <div className="flex justify-between text-xs mb-1">
                  <span className="capitalize text-slate-600">{stage}</span>
                  <span className="text-slate-400">{count}</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
