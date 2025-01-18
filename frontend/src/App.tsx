import './styles/App.css'
import DestinosList from './components/DestinosList'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AlojamientosList from './components/AlojamientosList'
function App() {
  
  

  return (
    <Router>
      <Routes>
       <Route path='/' element={<DestinosList />} />
       <Route path='/alojamientos/:id' element={<AlojamientosList />} />
      </Routes>
    </Router>
  )
}

export default App
