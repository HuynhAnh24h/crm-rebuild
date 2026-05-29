import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import authReducer from '@/features/auth/store/authSlice'
import customersReducer from '@/features/customers/store/customersSlice'
import leadsReducer from '@/features/leads/store/leadsSlice'
import toastReducer from '@/components/ui/toastSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customersReducer,
    leads: leadsReducer,
    toast: toastReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
