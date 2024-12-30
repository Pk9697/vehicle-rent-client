import { createSlice } from '@reduxjs/toolkit'
import { toast } from '@/hooks/use-toast'
import { createBooking, getUserBookings } from './actions'

const initialState = {
  bookings: [],
  isLoading: false,
  error: null,
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload?.success) {
          state.bookings.unshift(action.payload?.data)
          state.error = null
          toast({
            title: 'Booking created successfully!',
          })
        } else {
          state.error = action.payload?.message || 'Booking failed'
          toast({
            variant: 'destructive',
            title: action.payload?.message || 'Booking failed',
          })
        }
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload?.message || 'Server error'
        toast({
          variant: 'destructive',
          title: action.payload?.message || 'Server error',
        })
      })
      .addCase(getUserBookings.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserBookings.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload?.success) {
          state.bookings = action.payload?.data
          state.error = null
        } else {
          state.error = action.payload?.message || 'Server error'
          toast({
            variant: 'destructive',
            title: action.payload?.message || 'Server error',
          })
        }
      })
      .addCase(getUserBookings.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload?.message || 'Server error'
        toast({
          variant: 'destructive',
          title: action.payload?.message || 'Server error',
        })
      })
  },
})

export default bookingSlice.reducer
