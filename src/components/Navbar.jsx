import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { logout } from '@/redux/auth/actions'

function Navbar() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  return (
    <div className='flex justify-between items-center p-4 border-b-2 sticky top-0 bg-white'>
      <div className='text-lg font-bold'>
        <Link to='/'>VehicleRent</Link>
      </div>
      <div className='flex items-center gap-4'>
        {user && <span>{user.name}</span>}
        <Button variant='link'>
          <Link to='/bookings' className='hover:underline'>
            Bookings
          </Link>
        </Button>
        <Button onClick={() => dispatch(logout())}>Logout</Button>
      </div>
    </div>
  )
}

export default Navbar
