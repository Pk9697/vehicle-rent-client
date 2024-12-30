import { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'
import { API_URLS } from '@/lib/apiUrls'

function VehicleTypeStep({ wheels, selected, onChange }) {
  const [vehicleTypes, setVehicleTypes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const url = API_URLS.vehicleTypesByWheels(wheels)
        const response = await axios.get(url)
        if (response.data.success) {
          console.log(response.data.data)
          setVehicleTypes(response.data.data)
        } else {
          console.error('Error fetching vehicle types:', response.data.message)
          setVehicleTypes([])
        }
      } catch (error) {
        console.error('Error fetching vehicle types:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicleTypes()
  }, [wheels])

  if (loading) {
    return (
      <div className='space-y-6'>
        <h2 className='text-2xl font-bold tracking-tight'>
          Select vehicle type
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
      <h2 className='text-2xl font-bold tracking-tight'>Select vehicle type</h2>
      <RadioGroup value={selected} onValueChange={onChange}>
        <div className='grid gap-4'>
          {vehicleTypes.map((vehicleType, index) => (
            <Card
              key={`vehicleType-${index}`}
              className={selected === vehicleType.id ? 'border-primary' : ''}
            >
              <CardContent className='p-4'>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value={vehicleType.id} id={vehicleType.id} />
                  <Label htmlFor={vehicleType.id}>{vehicleType.name}</Label>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

export default VehicleTypeStep
