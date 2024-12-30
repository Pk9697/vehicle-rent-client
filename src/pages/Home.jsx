import { useState } from 'react'
// import { FormData, Step } from '../types/form'
// import { WheelsStep } from './steps/wheels-step'
// import { TypeStep } from './steps/type-step'
// import { ModelStep } from './steps/model-step'
// import { DateStep } from './steps/date-step'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import NameStep from '@/components/NameStep'
import WheelsStep from '@/components/WheelsStep'
import VehicleTypeStep from '@/components/VehicleTypeStep'
import VehicleModelStep from '@/components/VehicleModelStep'
import DateRangeStep from '@/components/DateRangeStep'
import { createBooking } from '@/redux/booking/actions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const INITIAL_FORM_DATA = {
  firstName: '',
  lastName: '',
  wheels: '2',
  vehicleTypeId: '',
  vehicleId: '',
  startDate: null,
  endDate: null,
}

export default function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentStep, setCurrentStep] = useState('name')
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [error, setError] = useState('')

  console.log({ formData })

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setError('')
  }

  const validateStep = () => {
    switch (currentStep) {
      case 'name':
        if (!formData.firstName || !formData.lastName) {
          setError('Please enter both first and last name')
          return false
        }
        break
      case 'wheels':
        if (!formData.wheels) {
          setError('Please select number of wheels')
          return false
        }
        break
      case 'type':
        if (!formData.vehicleTypeId) {
          setError('Please select a vehicle type')
          return false
        }
        break
      case 'model':
        if (!formData.vehicleId) {
          setError('Please select a vehicle model')
          return false
        }
        break
      case 'dates':
        if (!formData.startDate || !formData.endDate) {
          setError('Please select both start and end dates')
          return false
        }
        break
    }
    return true
  }

  const handleNext = () => {
    if (!validateStep()) return

    const steps = ['name', 'wheels', 'type', 'model', 'dates']
    const currentIndex = steps.indexOf(currentStep)

    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    // console.log('Form submitted:', formData)
    // Here you would typically send the data to your backend
    dispatch(createBooking(formData))
    navigate('/bookings')
  }

  return (
    <div className='absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <Card className='w-full max-w-xl mx-auto'>
        <CardContent className='p-6'>
          <div className='space-y-6'>
            {currentStep === 'name' && (
              <NameStep
                firstName={formData.firstName}
                lastName={formData.lastName}
                onChange={updateFormData}
              />
            )}
            {currentStep === 'wheels' && (
              <WheelsStep
                selected={formData.wheels}
                onChange={(wheels) => updateFormData({ wheels })}
              />
            )}
            {currentStep === 'type' && (
              <VehicleTypeStep
                wheels={formData.wheels}
                selected={formData.vehicleTypeId}
                onChange={(vehicleTypeId) => updateFormData({ vehicleTypeId })}
              />
            )}
            {currentStep === 'model' && (
              <VehicleModelStep
                vehicleTypeId={formData.vehicleTypeId}
                selected={formData.vehicleId}
                onChange={(vehicleId) => updateFormData({ vehicleId })}
              />
            )}
            {currentStep === 'dates' && (
              <DateRangeStep
                vehicleId={formData.vehicleId}
                startDate={formData.startDate}
                endDate={formData.endDate}
                onChange={updateFormData}
              />
            )}

            {error && (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button onClick={handleNext} className='w-full' size='lg'>
              {currentStep === 'dates' ? 'Submit' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
