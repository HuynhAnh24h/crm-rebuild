import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from '@/app/store'
import AppLayout from '@/components/layout/AppLayout'
import LoginPage from '@/features/auth/pages/LoginPage'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import CustomersPage from '@/features/customers/pages/CustomersPage'
import LeadsPage from '@/features/leads/pages/LeadsPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useAppSelector((s) => s.auth.token)
  return token ? <>{children}</> : <Navigate to="/login" replace />
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="leads" element={<LeadsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
