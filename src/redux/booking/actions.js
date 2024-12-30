import { API_URLS } from '@/lib/apiUrls'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (data, { getState, rejectWithValue }) => {
    try {
      const { accessToken } = getState().auth
      const url = API_URLS.createBooking()
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

const getUserBookings = createAsyncThunk(
  'booking/getUserBookings',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { accessToken } = getState().auth
      const url = API_URLS.getUserBookings()
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export { createBooking, getUserBookings }
