import { useContext } from 'react'

import { useNavigate } from 'react-router-dom'

import { ContextGlobal } from './utils/global.context'

/* eslint-disable react/prop-types */
const Card = ({ dentist }) => {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(ContextGlobal)
  const { name, username, id } = dentist

  const isFav = state.favs.some((fav) => fav?.id === id)

  const handleCardClick = () => {
    navigate(`/dentist/${id}`)
  }

  const handleFavClick = (e) => {
    e.stopPropagation()
    dispatch({ type: 'UPDATE_FAVS', payload: dentist })
  }

  return (
    <div className='card' onClick={() => handleCardClick()}>
      <button onClick={handleFavClick} className='fav-button'>
        <img src={isFav ? '../../public/images/filled-star.png' : '../../public/images/empty-star.png'} alt='Favorite icon' />
      </button>

      <img src='../../public/images/dentist.png' alt='' />

      <div className='card-info'>
        <h3>{name}</h3>
        <h4>@{username}</h4>
      </div>
    </div>
  )
}

export default Card
