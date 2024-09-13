import { useContext, useState } from 'react'
import { ContextGlobal } from './utils/global.context'

const Form = () => {
  const { state } = useContext(ContextGlobal)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const [person, setPerson] = useState({ name: '', email: '' })
  const [isValid, setIsValid] = useState(false)
  const [errors, setErrors] = useState({ name: false, email: false })

  const handleNameChange = (e) => {
    setPerson({ ...person, name: e.target.value })
    setIsValid(false)
    setErrors({ ...errors, name: false })
  }

  const handleEmailChange = (e) => {
    setPerson({ ...person, email: e.target.value })
    setIsValid(false)
    setErrors({ ...errors, email: false })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isNameValid = person.name === person.name.trimStart() && person.name.length > 5
    const isEmailValid = emailRegex.test(person.email)

    isNameValid && isEmailValid
      ? setIsValid(true)
      : !isNameValid && !isEmailValid
          ? setErrors({ name: true, email: true })
          : !isNameValid && isEmailValid
              ? setErrors({ ...errors, name: true })
              : isNameValid && !isEmailValid &&
          setErrors({ ...errors, email: true })

    if (isValid) {
      console.log(person)
      setPerson({ name: '', email: '' })
    }

    setTimeout(() => {
      setIsValid(false)
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit}>
      {
        isValid &&
          <p className='success'>Thanks {person.name}! We'll get back to you shorthly</p>
      }

      <label htmlFor='name'>
        <span>Name:</span>
        <input className={`${state.isDarkTheme && 'dark-input'}`} id='name' type='text' value={person.name} onChange={handleNameChange} placeholder='Enter your name' autoComplete='name' />
        {
        errors.name === true &&
          <p className='error'>Please validate your information</p>
      }
      </label>

      <label htmlFor='email'>
        <span>Email:</span>
        <input className={`${state.isDarkTheme && 'dark-input'}`} id='email' type='text' value={person.email} onChange={handleEmailChange} placeholder='Enter your email' autoComplete='email' />
        {
        errors.email === true &&
          <p className='error'>Please validate your information</p>
      }
      </label>

      <button type='submit' className='primary-btn'>Enviar</button>
    </form>
  )
}

export default Form
