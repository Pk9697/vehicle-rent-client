import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'
import Bookings from './pages/Bookings'
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/bookings' element={<Bookings />} />
          </Route>
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
