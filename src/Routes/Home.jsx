import { useContext } from 'react'

import { ContextGlobal } from '../Components/utils/global.context'
import Card from '../Components/Card'

const Home = () => {
  const { state } = useContext(ContextGlobal)
  const dentists = state.dentists

  return (
    <main className={`page ${state.isDarkTheme && 'dark'}`}>
      <h1>Our Dentists</h1>

      <div className='card-grid'>
        {
          dentists &&
          dentists.map((dentist) =>
            <Card key={dentist.id} dentist={dentist} />
          )
        }
      </div>
    </main>
  )
}

export default Home
