/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react'

import axios from 'axios'
import { useParams } from 'react-router-dom'

import { ContextGlobal } from '../Components/utils/global.context'

const Detail = () => {
  const params = useParams()
  const url = `https://jsonplaceholder.typicode.com/users/${params.id}`
  const { state, dispatch } = useContext(ContextGlobal)
  const selectedDentist = state.selectedDentist

  useEffect(() => {
    if (!state.selectedDentist || state.selectedDentist.id !== Number(params.id)) {
      const fetchDentist = async () => {
        try {
          const response = await axios.get(url)
          dispatch({ type: 'GET_SELECTED_DENTIST', payload: response.data })
        } catch (error) {
          console.error('Error fetching dentist:', error)
        }
      }

      fetchDentist()
    }
  }, [params.id, state.selectedDentist, dispatch])

  return (
    <div className={`page ${state.isDarkTheme && 'dark'}`}>
      {
        selectedDentist &&
          <div className='detail-card'>
            <h1>{selectedDentist.name}</h1>
            <img src='../../public/images/dentist.png' alt='' />
            <h4>{selectedDentist.email}</h4>
            <h4>{selectedDentist.phone}</h4>
            <h4>@{selectedDentist.website}</h4>
          </div>
      }
    </div>
  )
}

export default Detail
