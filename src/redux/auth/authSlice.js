import { createSlice } from '@reduxjs/toolkit'
import { login, logout, register, verifyAccessToken } from './actions'
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
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload?.success) {
          state.user = null
          state.accessToken = null
          state.error = null
          state.isLoggedIn = false
          toast({
            title: 'Logged out successfully!',
          })
        } else {
          state.error = action.payload.message || 'Logout failed'
          toast({
            variant: 'destructive',
            title: action.payload.message || 'Logout failed',
          })
        }
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.message || 'Server error'
        toast({
          variant: 'destructive',
          title: action.payload.message || 'Server error',
        })
      })

      .addCase(verifyAccessToken.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verifyAccessToken.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload?.success) {
          state.error = null
          state.isLoggedIn = true
        } else {
          state.error = action.payload.message || 'Verification failed'
          state.user = null
          state.accessToken = null
          state.isLoggedIn = false
          toast({
            variant: 'destructive',
            title: action.payload.message || 'Verification failed',
          })
        }
      })
      .addCase(verifyAccessToken.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.message || 'Server error'
        state.user = null
        state.accessToken = null
        state.isLoggedIn = false
        toast({
          variant: 'destructive',
          title: action.payload.message || 'Server error',
        })
      })
  },
})

export default authSlice.reducer
