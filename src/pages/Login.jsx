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
import useLogin from '@/hooks/useLogin'
import { useSelector } from 'react-redux'

function Login() {
  const { email, password, handleChange, handleSubmit } = useLogin()
  const { isLoggedIn, isLoading } = useSelector((state) => state.auth)

  if (isLoggedIn) {
    return <Navigate to='/' />
  }
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
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
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className='justify-center'>
          <div className='text-center text-sm text-muted-foreground'>
            <p>
              Don&apos;t have an account?{' '}
              <Link
                to='/register'
                className='underline underline-offset-4 hover:text-primary'
              >
                Register
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
