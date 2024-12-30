import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { getUserBookings } from '@/redux/booking/actions'
import { useNavigate } from 'react-router-dom'

function Bookings() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    bookings = [],
    isLoading,
  } = useSelector((state) => state.booking)

  useEffect(() => {
    dispatch(getUserBookings())
  }, [])

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='p-4 flex flex-col gap-4'>
      <h1 className='text-2xl font-bold text-center'>Bookings</h1>
      <Button className='self-center' onClick={() => navigate('/')}>
        Make Another Booking
      </Button>

      <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4'>
        {bookings.map((booking, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>
                Rental Period: {formatDate(booking.startDate)} -{' '}
                {formatDate(booking.endDate)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <p>
                  <strong>Name:</strong> {booking.firstName} {booking.lastName}
                </p>
                <p>
                  <strong>Vehicle Type:</strong>{' '}
                  {booking.vehicleDetails?.vehicleType?.name}
                </p>
                <p>
                  <strong>Vehicle Model:</strong>{' '}
                  {booking.vehicleDetails?.model}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Bookings
