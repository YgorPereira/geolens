import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { ContinentsPage } from './features/Continents/ContinentsPage'

function App() {

  return (
    <Routes>
      {/* Home */}
      <Route path='/' element={<Home />} />

      {/* Features */}
      <Route path='/continentes' element={<ContinentsPage />} />

    </Routes>
  )
}

export default App
