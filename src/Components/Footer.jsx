import { useContext } from 'react'

import { ContextGlobal } from './utils/global.context'

const Footer = () => {
  const { state } = useContext(ContextGlobal)

  return (
    <footer className={`${state.isDarkTheme && 'dark-nav'}`}>
      <p>Powered by</p>
      {
          state.isDarkTheme
            ? <img src='../../public/images/DH-white.png' alt='DH-logo' />
            : <img src='../../public/images/DH.png' alt='DH-logo' />
        }
    </footer>
  )
}

export default Footer
