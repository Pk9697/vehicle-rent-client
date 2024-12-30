import { Calendar } from '@/components/ui/calendar'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { API_URLS } from '@/lib/apiUrls'
import axios from 'axios'

function DateRangeStep({ startDate, endDate, onChange, vehicleId }) {
  const [vehicleBookedDates, setVehicleBookedDates] = useState([])
  const [loading, setLoading] = useState(true)

  const [date, setDate] = useState({
    from: startDate || undefined,
    to: endDate || undefined,
  })

  useEffect(() => {
    const fetchVehicleBookedDates = async () => {
      try {
        const url = API_URLS.vehiclesBookedDates(vehicleId)
        const response = await axios.get(url)
        if (response.data.success) {
          console.log(response.data.data)
          setVehicleBookedDates(response.data.data)
        } else {
          console.error(
            'Error fetching vehicles booked dates:',
            response.data.message
          )
          setVehicleBookedDates([])
        }
      } catch (error) {
        console.error('Error fetching vehicles booked dates:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicleBookedDates()
  }, [vehicleId])

  const handleSelect = (range) => {
    setDate(range)
    onChange({
      startDate: range?.from || null,
      endDate: range?.to || null,
    })
  }

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold tracking-tight'>Select rental dates</h2>
      <Card>
        <CardContent className='p-0 flex items-center justify-center'>
          <Calendar
            mode='range'
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            className='rounded-md'
            disabled={(date) => date < new Date() || vehicleBookedDates.some(({ startDate, endDate }) => 
              new Date(startDate) <= date && date <= new Date(endDate)
            )}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default DateRangeStep
