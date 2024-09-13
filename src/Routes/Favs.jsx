import { useContext } from 'react'

import { useNavigate } from 'react-router-dom'

import { ContextGlobal } from '../Components/utils/global.context'
import Card from '../Components/Card'

const Favs = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(ContextGlobal)
  const favs = state.favs

  const handleDeleteClick = () => {
    dispatch({ type: 'DELETE_FAVS' })
  }

  return (
    <div className={`page ${state.isDarkTheme && 'dark'}`}>
      <h1>Your Favorite Dentists</h1>
      <div className='card-grid'>
        {
          favs?.length > 0
            ? favs.map((dentist) =>
              <Card key={dentist.id} dentist={dentist} />
            )
            : <div className='no-favs'>
              <h3>You don't have any favorites yet</h3>
              <button className='primary-btn' onClick={() => navigate('/')}>Explore</button>
            </div>
        }
      </div>

      {
        favs?.length > 0 &&
          <button className='primary-btn' onClick={() => handleDeleteClick()}>Dellete All</button>
      }
    </div>
  )
}

export default Favs
