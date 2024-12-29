export const BASE_ROOT =
  import.meta.env.VITE_BASE_ROOT || 'http://localhost:8000'
export const API_ROOT =
  import.meta.env.VITE_API_ROOT || 'http://localhost:8000/api/v1'

export const API_URLS = {
  login: () => `${API_ROOT}/users/login`,
  register: () => `${API_ROOT}/users/register`,
  //   TODO in backend
  logout: () => `${API_ROOT}/users/logout`,
  verifyAccessToken: () => `${API_ROOT}/users/verify-access-token`,
}
