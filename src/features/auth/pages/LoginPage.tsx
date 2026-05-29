import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EnvelopeIcon, LockClosedIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { loginThunk } from '../store/authSlice'
import { loginSchema, LoginFormData } from '../types'
import { FormInput } from '@/components/form/FormField'
import Button from '@/components/ui/Button'

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { loading, error, token } = useAppSelector((s) => s.auth)

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  useEffect(() => {
    if (token) navigate('/dashboard', { replace: true })
  }, [token, navigate])

  const onSubmit = (data: LoginFormData) => {
    dispatch(loginThunk(data))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-200">
            <ChartBarIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">CRM Pro</h1>
          <p className="text-sm text-slate-500 mt-1">Đăng nhập vào tài khoản của bạn</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormInput
              name="email"
              control={control}
              label="Email"
              type="email"
              placeholder="admin@example.com"
              required
              leftIcon={<EnvelopeIcon className="w-4 h-4" />}
            />
            <FormInput
              name="password"
              control={control}
              label="Mật khẩu"
              type="password"
              placeholder="••••••••"
              required
              leftIcon={<LockClosedIcon className="w-4 h-4" />}
            />

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <Button type="submit" fullWidth loading={loading} size="lg">
              Đăng nhập
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Demo: nhập bất kỳ email & password ≥ 6 ký tự
        </p>
      </div>
    </div>
  )
}
