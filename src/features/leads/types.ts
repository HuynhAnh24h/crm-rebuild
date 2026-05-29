import { z } from 'zod'

export const leadSchema = z.object({
  name: z.string().min(2, 'Tên tối thiểu 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().optional(),
  source: z.enum(['website', 'referral', 'social', 'cold_call', 'other']),
  stage: z.enum(['new', 'contacted', 'qualified', 'proposal', 'won', 'lost']),
  value: z.number().min(0).optional(),
  note: z.string().optional(),
})

export type LeadFormData = z.infer<typeof leadSchema>

export interface Lead extends LeadFormData {
  id: string
  createdAt: string
}

export interface LeadsState {
  items: Lead[]
  loading: boolean
  error: string | null
  selectedLead: Lead | null
}
