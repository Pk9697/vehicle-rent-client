import { login } from '@/redux/auth/actions'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

function useLogin() {
  const dispatch = useDispatch()
  const [formFields, setFormFields] = useState({
    email: 'demo.user@gmail.com',
    password: '123456',
  })

  function handleChange(e) {
    const { name, value } = e.target
    setFormFields((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(login(formFields))
    setFormFields(() => {
      return {
        email: 'demo.user@gmail.com',
        password: '123456',
      }
    })
  }

  return { ...formFields, handleChange, handleSubmit }
}

export default useLogin
