import { createSlice } from '@reduxjs/toolkit'
import { login, register } from './actions'
import { toast } from '@/hooks/use-toast'

const initialState = {
  user: null,
  accessToken: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload?.success) {
          state.user = action.payload.data
          state.error = null
          toast({
            title: 'Registered successfully! Now please Log in',
          })
        } else {
          state.error = action.payload.message || 'Registration failed'
          toast({
            variant: 'destructive',
            title: action.payload.message || 'Registration failed',
          })
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.message || 'Server error'
        toast({
          variant: 'destructive',
          title: action.payload.message || 'Server error',
        })
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload?.success) {
          state.user = action.payload.data?.user
          state.accessToken = action.payload.data?.accessToken
          state.error = null
          state.isLoggedIn = true
          toast({
            title: 'Logged in successfully!',
          })
        } else {
          state.error = action.payload.message || 'Login failed'
          toast({
            variant: 'destructive',
            title: action.payload.message || 'Login failed',
          })
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.message || 'Server error'
        toast({
          variant: 'destructive',
          title: action.payload.message || 'Server error',
        })
      })
  },
})

export default authSlice.reducer
