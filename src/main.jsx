import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { NAME_APP } from './config/main.config.js'

// Configurar el título y el favicon dinámicamente
document.title = NAME_APP.name;
const favicon = document.querySelector('link[rel="shortcut icon"]');
if (favicon) {
  favicon.href = '/logo.png'; // En Vite, la carpeta public se sirve en la raíz
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)