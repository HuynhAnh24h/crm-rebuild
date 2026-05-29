import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import api from '@/lib/axios'
import { AuthState, AuthUser, LoginFormData } from '../types'

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
}

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data: LoginFormData, { rejectWithValue }) => {
    try {
      // Mock response – thay bằng API thật
      // const res = await api.post('/auth/login', data)
      const mockUser: AuthUser = {
        id: '1',
        name: 'Admin User',
        email: data.email,
        role: 'admin',
      }
      const mockToken = 'mock-jwt-token-' + Date.now()
      localStorage.setItem('token', mockToken)
      localStorage.setItem('user', JSON.stringify(mockUser))
      return { user: mockUser, token: mockToken }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Đăng nhập thất bại')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
