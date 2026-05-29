import { z } from 'zod'

export const customerSchema = z.object({
  name: z.string().min(2, 'Tên tối thiểu 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().min(9, 'Số điện thoại không hợp lệ').optional().or(z.literal('')),
  company: z.string().optional(),
  status: z.enum(['active', 'inactive', 'prospect']),
  note: z.string().optional(),
})

export type CustomerFormData = z.infer<typeof customerSchema>

export interface Customer extends CustomerFormData {
  id: string
  createdAt: string
  updatedAt: string
}

export type CustomerStatus = Customer['status']

export interface CustomersState {
  items: Customer[]
  selectedCustomer: Customer | null
  loading: boolean
  error: string | null
  total: number
  page: number
  pageSize: number
}
