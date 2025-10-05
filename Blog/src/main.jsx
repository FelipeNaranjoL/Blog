/**
 * ==========================================================
 * Archivo: main.jsx
 * Descripción:
 * - Punto de entrada principal de la aplicación React.
 * - Renderiza el componente <App /> dentro del DOM.
 * - Envuelve la app en BrowserRouter para manejo de rutas y
 *   AppProvider para el contexto global.
 * ==========================================================
 */

import { createRoot } from 'react-dom/client' // Nueva API de React 18 para renderizado
import './index.css'                            // Importa estilos globales
import App from './App.jsx'                     // Componente raíz de la app
import { BrowserRouter } from 'react-router-dom' // Router para navegación SPA
import { AppProvider } from './context/AppContext.jsx' // Contexto global de la app

// Selecciona el contenedor del DOM donde se montará React
const rootElement = document.getElementById('root')

// Crea el root de React 18
const root = createRoot(rootElement)

// Renderiza la aplicación
root.render(
  // BrowserRouter permite usar rutas (react-router-dom)
  <BrowserRouter>
    {/* AppProvider provee estados y funciones globales a todos los componentes */}
    <AppProvider>
      {/* Componente principal de la aplicación */}
      <App />
    </AppProvider>
  </BrowserRouter>
)
