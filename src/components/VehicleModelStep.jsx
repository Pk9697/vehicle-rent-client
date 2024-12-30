import { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { API_URLS } from '@/lib/apiUrls'
import axios from 'axios'

function VehicleModelStep({ vehicleTypeId, selected, onChange }) {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const url = API_URLS.vehiclesByVehicleTypeId(vehicleTypeId)
        const response = await axios.get(url)
        if (response.data.success) {
          console.log(response.data.data)
          setVehicles(response.data.data)
        } else {
          console.error('Error fetching vehicles:', response.data.message)
          setVehicles([])
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [vehicleTypeId])

  if (loading) {
    return (
      <div className='space-y-6'>
        <h2 className='text-2xl font-bold tracking-tight'>
          Select vehicle model
        </h2>
        <div className='space-y-4'>
          <Skeleton className='h-20 w-full' />
          <Skeleton className='h-20 w-full' />
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold tracking-tight'>
        Select vehicle model
      </h2>
      <RadioGroup value={selected} onValueChange={onChange}>
        <div className='grid gap-4'>
          {vehicles.map((vehicle, index) => (
            <Card
              key={`vehicle-${index}`}
              className={selected === vehicle.id ? 'border-primary' : ''}
            >
              <CardContent className='p-4'>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value={vehicle.id} id={vehicle.id} />
                  <Label htmlFor={vehicle.id}>{vehicle.model}</Label>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export default VehicleModelStep
