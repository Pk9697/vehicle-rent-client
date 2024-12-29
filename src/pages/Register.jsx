import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link, Navigate } from 'react-router-dom'
import useRegister from '@/hooks/useRegister'
import { useSelector } from 'react-redux'

function Register() {
  const { name, email, password, handleChange, handleSubmit } = useRegister()
  const { user, isLoggedIn, isLoading } = useSelector((state) => state.auth)

  if (isLoggedIn) {
    return <Navigate to='/' />
  }

  // If after registeration user field exists then user is registered
  // so navigate user to login page
  if (user) {
    return <Navigate to='/login' />
  }

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                name='name'
                type='text'
                required
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                type='email'
                required
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                name='password'
                type='password'
                required
                value={password}
                onChange={handleChange}
              />
            </div>
            <Button disabled={isLoading} type='submit' className='w-full'>
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className='justify-center'>
          <div className='text-center text-sm text-muted-foreground'>
            <p>
              Already have an account?{' '}
              <Link
                to='/login'
                className='underline underline-offset-4 hover:text-primary'
              >
                Login
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Register
