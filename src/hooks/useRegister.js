import { register } from '@/redux/auth/actions'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

function useRegister() {
  const dispatch = useDispatch()
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    password: '',
  })

  //   TODO: Clear image selected name after form submission
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

    dispatch(register(formFields))

    setFormFields(() => {
      return {
        name: '',
        email: '',
        password: '',
      }
    })
  }

  return {
    ...formFields,
    handleChange,
    handleSubmit,
  }
}

export default useRegister
