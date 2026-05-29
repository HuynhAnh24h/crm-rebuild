import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
})

export type LoginFormData = z.infer<typeof loginSchema>

export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'sales' | 'manager'
  avatar?: string
}

export interface AuthState {
  user: AuthUser | null
  token: string | null
  loading: boolean
  error: string | null
}
