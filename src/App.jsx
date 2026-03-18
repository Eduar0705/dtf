import { Routes, Route, Navigate } from 'react-router-dom';
import { NAME_APP } from './config/main.config.js'

import Index from './index';
import Tienda from './pages/tienda';
import Galeria from './pages/galeria';

export default function App(){
  return(
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/tienda" element={<Tienda />} />
      <Route path="/galeria" element={<Galeria />} />
      <Route path="/index" element={<Navigate to="/" replace />} />
    </Routes>
  )
}