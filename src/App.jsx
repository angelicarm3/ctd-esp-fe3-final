import { useContext } from 'react'

import { Outlet, Route, Routes } from 'react-router-dom'

import { ContextGlobal } from './Components/utils/global.context'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Routes/Home'
import Contact from './Routes/Contact'
import Detail from './Routes/Detail'
import Favs from './Routes/Favs'

function App () {
  const { state } = useContext(ContextGlobal)

  function LayoutWithNavbarAndFooter () {
    return (
      <div className={`app ${state.isDarkTheme && 'dark'}`}>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    )
  }

  return (
    <Routes>
      <Route element={<LayoutWithNavbarAndFooter />}>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/dentist/:id' element={<Detail />} />
        <Route path='/favs' element={<Favs />} />
      </Route>
    </Routes>
  )
}

export default App
