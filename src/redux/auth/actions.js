import { API_URLS } from '@/lib/apiUrls'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const register = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const url = API_URLS.register()
      const response = await axios.post(url, data)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

const login = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const url = API_URLS.login()
      const response = await axios.post(url, data)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

const logout = createAsyncThunk(
  'auth/logout',
  async (data, { getState, rejectWithValue }) => {
    try {
      const { accessToken } = getState().auth
      const url = API_URLS.logout()
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

const verifyAccessToken = createAsyncThunk(
  'auth/verifyAccessToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { accessToken } = getState().auth
      const url = API_URLS.verifyAccessToken()
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

export { register, login, logout, verifyAccessToken }
