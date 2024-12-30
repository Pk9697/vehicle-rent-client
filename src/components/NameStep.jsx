import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function NameStep({ firstName, lastName, onChange }) {
  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold tracking-tight'>
        First, what&apos;s your name?
      </h2>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='firstName'>First Name</Label>
          <Input
            type='text'
            id='firstName'
            value={firstName}
            onChange={(e) => onChange({ firstName: e.target.value, lastName })}
            placeholder='Enter your first name'
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='lastName'>Last Name</Label>
          <Input
            type='text'
            id='lastName'
            value={lastName}
            onChange={(e) => onChange({ firstName, lastName: e.target.value })}
            placeholder='Enter your last name'
          />
        </div>
      </div>
    </div>
  )
}

export default NameStep
