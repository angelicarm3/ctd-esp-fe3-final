import { useContext } from 'react'

import { ContextGlobal } from './utils/global.context'
import { Link } from 'react-router-dom'

const navOptions = [{ text: 'Home', link: '/' }, { text: 'Favs', link: '/favs' }, { text: 'Contact', link: '/contact' }]

const Navbar = () => {
  const { state, dispatch } = useContext(ContextGlobal)
  const toggleTheme = () => {
    dispatch({ type: 'CHANGE_THEME' })
  }

  return (
    <nav className={`${state.isDarkTheme && 'dark-nav'}`}>
      <div className='nav-grid'>
        {
        navOptions.map((option, index) =>
          <Link key={index} to={option.link}>{option.text}</Link>
        )
      }
      </div>

      <button className='theme-button' onClick={() => toggleTheme()}>
        {
          state.isDarkTheme
            ? <img src='../../public/images/dark-mode-toggle-icon.png' alt='Change theme' />
            : <img src='../../public/images/light-mode-toggle-icon.png' alt='Change theme' />
        }
      </button>
    </nav>
  )
}

export default Navbar
