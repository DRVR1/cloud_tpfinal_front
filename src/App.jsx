import './App.css'
import './index.css';
import { useState } from 'react'
import Admin from './components/pages/Admin';
import Home from './components/pages/home/Home';
import NavBar from './components/nabvars/NavBar';
import Login from './components/pages/Login';
import Propiedades from './components/pages/Propiedades';
import Contact from './components/pages/Contact';
import Register from './components/pages/Register';
import { Routes, Route } from 'react-router-dom'; 

function App() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('token')))
  return (
    <div>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/propiedades" element={<Propiedades />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App