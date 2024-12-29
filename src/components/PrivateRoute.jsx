import { verifyAccessToken } from '@/redux/auth/actions'
import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector((state) => state.auth)

  useLayoutEffect(() => {
    dispatch(verifyAccessToken())
  }, [])

  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
