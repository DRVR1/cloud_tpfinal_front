// App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import './index.css';
import Admin from './components/pages/Admin';
import Home from './components/pages/home/Home';
import NavBar from './components/nabvars/NavBar';
import Login from './components/pages/Login';
import Propiedades from './components/pages/Propiedades';
import Propiedad from './components/pages/Propiedad';

import Contact from './components/pages/Contact';

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/propiedades" element={<Propiedades />} />
          {/* CAMBIO CLAVE AQUÍ: Se añade /:id para capturar el ID */}
          <Route path="/propiedad/:id" element={<Propiedad />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App