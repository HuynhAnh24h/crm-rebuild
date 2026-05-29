import { NavLink, Outlet } from 'react-router-dom'
import {
  HomeIcon,
  UsersIcon,
  FunnelIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeIconSolid,
  UsersIcon as UsersIconSolid,
  FunnelIcon as FunnelIconSolid,
} from '@heroicons/react/24/solid'
import { useAppDispatch } from '@/app/store'
import { logout } from '@/features/auth/store/authSlice'
import ToastContainer from '@/components/ui/Toast'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: HomeIcon, iconActive: HomeIconSolid },
  { to: '/customers', label: 'Customers', icon: UsersIcon, iconActive: UsersIconSolid },
  { to: '/leads', label: 'Leads', icon: FunnelIcon, iconActive: FunnelIconSolid },
]

export default function AppLayout() {
  const dispatch = useAppDispatch()

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-white border-r border-slate-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <ChartBarIcon className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-800 text-base tracking-tight">CRM Pro</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map(({ to, label, icon: Icon, iconActive: IconActive }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }`
              }
            >
              {({ isActive }) =>
                isActive ? (
                  <><IconActive className="w-4.5 h-4.5" />{label}</>
                ) : (
                  <><Icon className="w-4.5 h-4.5" />{label}</>
                )
              }
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-slate-200 space-y-0.5">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
              }`
            }
          >
            <Cog6ToothIcon className="w-4.5 h-4.5" />
            Settings
          </NavLink>
          <button
            onClick={() => dispatch(logout())}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-150"
          >
            <ArrowRightOnRectangleIcon className="w-4.5 h-4.5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>

      <ToastContainer />
    </div>
  )
}
