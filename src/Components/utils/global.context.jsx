/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useReducer, useMemo } from 'react'

import axios from 'axios'

export const ContextGlobal = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      state.isDarkTheme
        ? document.getElementById('root').classList.remove('dark')
        : document.getElementById('root').classList.add('dark')
      return { ...state, isDarkTheme: !state.isDarkTheme }
    case 'GET_DENTISTS':
      return { ...state, dentists: action.payload }
    case 'GET_FAVS':
      return { ...state, favs: JSON.parse(localStorage.getItem('favs')) || [] }
    case 'UPDATE_FAVS': {
      const favExists = state.favs.some((fav) => fav?.id === action.payload.id)
      let updatedFavs

      if (favExists) {
        updatedFavs = state.favs.filter((fav) => fav.id !== action.payload.id)
      } else {
        updatedFavs = [...state.favs, action.payload]
      }

      localStorage.setItem('favs', JSON.stringify(updatedFavs))
      return { ...state, favs: updatedFavs }
    }
    case 'DELETE_FAVS':
      localStorage.removeItem('favs')
      return { ...state, favs: [] }
    case 'GET_SELECTED_DENTIST':
      return { ...state, selectedDentist: action.payload }
    default:
      return state
  }
}

const initialState = {
  isDarkTheme: false,
  dentists: [],
  favs: [],
  selectedDentist: {}
}

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const url = 'https://jsonplaceholder.typicode.com/users'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url)
        dispatch({ type: 'GET_DENTISTS', payload: response.data })
        dispatch({ type: 'GET_FAVS' })
      } catch (error) {
        console.error('Error fetching dentist list:', error)
      }
    }

    fetchData()
  }, [url])

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])

  return (
    <ContextGlobal.Provider value={contextValue}>
      {children}
    </ContextGlobal.Provider>
  )
}
