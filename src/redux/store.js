import { combineReducers, configureStore } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'
import authReducer from './auth/authSlice'
import bookingReducer from './booking/bookingSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  booking: bookingReducer,
})

const persistConfig = {
  key: 'vehicle-rent',
  version: 2,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

const persistor = persistStore(store)

export { store, persistor }
