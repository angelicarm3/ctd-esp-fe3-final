import { useContext } from 'react'

import { ContextGlobal } from '../Components/utils/global.context'
import Form from '../Components/Form'

const Contact = () => {
  const { state } = useContext(ContextGlobal)

  return (
    <div className={`page ${state.isDarkTheme && 'dark'}`}>
      <h1>Contact us</h1>
      <Form />
    </div>
  )
}

export default Contact
