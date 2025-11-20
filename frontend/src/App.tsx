import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { ContinentsPage } from './features/Continents/Page/ContinentsPage'
import { CountriesPage } from './features/Countries/Page/CountriesPage'
import { CitiesPage } from './features/Cities/Page/CitiesPage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />

      <Route path='/continentes' element={<ContinentsPage />} />
      <Route path='/paises' element={<CountriesPage />} />
      <Route path='/cidades' element={<CitiesPage />} />

    </Routes>
  )
}

export default App
