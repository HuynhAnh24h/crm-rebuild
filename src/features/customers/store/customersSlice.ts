import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
// import api from '@/lib/axios'
import { Customer, CustomerFormData, CustomersState } from '../types'

// ── Mock data ────────────────────────────────────────────────────
const MOCK: Customer[] = [
  { id: '1', name: 'Nguyễn Văn An', email: 'an@example.com', phone: '0901234567', company: 'FPT Corp', status: 'active', note: '', createdAt: '2024-01-10', updatedAt: '2024-01-10' },
  { id: '2', name: 'Trần Thị Bình', email: 'binh@example.com', phone: '0912345678', company: 'VinGroup', status: 'prospect', note: '', createdAt: '2024-02-15', updatedAt: '2024-02-15' },
  { id: '3', name: 'Lê Minh Châu', email: 'chau@example.com', company: 'Shopee VN', status: 'inactive', note: 'Cần follow-up', createdAt: '2024-03-01', updatedAt: '2024-03-01' },
]

let mockDB = [...MOCK]

// ── Thunks ───────────────────────────────────────────────────────
export const fetchCustomers = createAsyncThunk(
  'customers/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      // const res = await api.get('/customers')
      await new Promise((r) => setTimeout(r, 500))
      return mockDB
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Lỗi tải danh sách')
    }
  }
)

export const createCustomer = createAsyncThunk(
  'customers/create',
  async (data: CustomerFormData, { rejectWithValue }) => {
    try {
      await new Promise((r) => setTimeout(r, 400))
      const newItem: Customer = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      mockDB.push(newItem)
      return newItem
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Tạo thất bại')
    }
  }
)

export const updateCustomer = createAsyncThunk(
  'customers/update',
  async ({ id, data }: { id: string; data: CustomerFormData }, { rejectWithValue }) => {
    try {
      await new Promise((r) => setTimeout(r, 400))
      mockDB = mockDB.map((c) =>
        c.id === id ? { ...c, ...data, updatedAt: new Date().toISOString() } : c
      )
      return mockDB.find((c) => c.id === id)!
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Cập nhật thất bại')
    }
  }
)

export const deleteCustomer = createAsyncThunk(
  'customers/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await new Promise((r) => setTimeout(r, 300))
      mockDB = mockDB.filter((c) => c.id !== id)
      return id
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Xóa thất bại')
    }
  }
)

// ── Slice ─────────────────────────────────────────────────────────
const initialState: CustomersState = {
  items: [],
  selectedCustomer: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  pageSize: 10,
}

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<Customer | null>) => {
      state.selectedCustomer = action.payload
    },
    clearError: (state) => { state.error = null },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchCustomers.pending, (s) => { s.loading = true; s.error = null })
      .addCase(fetchCustomers.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; s.total = a.payload.length })
      .addCase(fetchCustomers.rejected, (s, a) => { s.loading = false; s.error = a.payload as string })

      // create
      .addCase(createCustomer.pending, (s) => { s.loading = true })
      .addCase(createCustomer.fulfilled, (s, a) => { s.loading = false; s.items.unshift(a.payload); s.total++ })
      .addCase(createCustomer.rejected, (s, a) => { s.loading = false; s.error = a.payload as string })

      // update
      .addCase(updateCustomer.pending, (s) => { s.loading = true })
      .addCase(updateCustomer.fulfilled, (s, a) => {
        s.loading = false
        s.items = s.items.map((c) => (c.id === a.payload.id ? a.payload : c))
      })
      .addCase(updateCustomer.rejected, (s, a) => { s.loading = false; s.error = a.payload as string })
      
      // delete
      .addCase(deleteCustomer.pending, (s) => { s.loading = true })
      .addCase(deleteCustomer.fulfilled, (s, a) => {
        s.loading = false
        s.items = s.items.filter((c) => c.id !== a.payload)
        s.total--
      })
      .addCase(deleteCustomer.rejected, (s, a) => { s.loading = false; s.error = a.payload as string })
  },
})

export const { setSelected, clearError } = customersSlice.actions
export default customersSlice.reducer
