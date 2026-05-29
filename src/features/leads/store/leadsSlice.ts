import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Lead, LeadFormData, LeadsState } from '../types'

let mockLeads: Lead[] = [
  { id: '1', name: 'Phạm Đức Dũng', email: 'dung@co.vn', phone: '0931111111', source: 'website', stage: 'new', value: 5000000, createdAt: '2024-04-01' },
  { id: '2', name: 'Hoàng Thị Giang', email: 'giang@biz.vn', source: 'referral', stage: 'contacted', value: 12000000, createdAt: '2024-04-05' },
  { id: '3', name: 'Vũ Quang Hùng', email: 'hung@startup.vn', source: 'social', stage: 'qualified', value: 30000000, createdAt: '2024-04-10' },
]

export const fetchLeads = createAsyncThunk('leads/fetchAll', async () => {
  await new Promise((r) => setTimeout(r, 400))
  return mockLeads
})

export const createLead = createAsyncThunk('leads/create', async (data: LeadFormData) => {
  await new Promise((r) => setTimeout(r, 300))
  const item: Lead = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() }
  mockLeads.unshift(item)
  return item
})

export const deleteLead = createAsyncThunk('leads/delete', async (id: string) => {
  await new Promise((r) => setTimeout(r, 300))
  mockLeads = mockLeads.filter((l) => l.id !== id)
  return id
})

const leadsSlice = createSlice({
  name: 'leads',
  initialState: { items: [], loading: false, error: null, selectedLead: null } as LeadsState,
  reducers: {
    setSelectedLead: (s, a: PayloadAction<Lead | null>) => { s.selectedLead = a.payload },
  },
  extraReducers: (b) => {
    b.addCase(fetchLeads.pending, (s) => { s.loading = true })
     .addCase(fetchLeads.fulfilled, (s, a) => { s.loading = false; s.items = a.payload })
     .addCase(createLead.fulfilled, (s, a) => { s.items.unshift(a.payload) })
     .addCase(deleteLead.fulfilled, (s, a) => { s.items = s.items.filter((l) => l.id !== a.payload) })
  },
})

export const { setSelectedLead } = leadsSlice.actions
export default leadsSlice.reducer
