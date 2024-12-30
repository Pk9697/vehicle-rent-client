export const BASE_ROOT =
  import.meta.env.VITE_BASE_ROOT || 'http://localhost:8000'
export const API_ROOT =
  import.meta.env.VITE_API_ROOT || 'http://localhost:8000/api/v1'

export const API_URLS = {
  login: () => `${API_ROOT}/users/login`,
  register: () => `${API_ROOT}/users/register`,
  logout: () => `${API_ROOT}/users/logout`,
  verifyAccessToken: () => `${API_ROOT}/users/verify-access-token`,
  vehicleTypesByWheels: (wheels) => `${API_ROOT}/vehicleTypes/${wheels}`,
  vehiclesByVehicleTypeId: (id) => `${API_ROOT}/vehicles/vehicleTypeId/${id}`,
  vehiclesBookedDates: (id) => `${API_ROOT}/bookings/vehicles/${id}`,
  createBooking: () => `${API_ROOT}/bookings/create`,
  getUserBookings: () => `${API_ROOT}/bookings/user`,
}
