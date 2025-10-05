/**
 * ==========================================================
 * Componente: App.jsx
 * Descripción:
 * - Componente raíz de la aplicación.
 * - Configura las rutas principales del frontend y panel admin.
 * - Protege rutas de administración usando `token` del contexto global.
 * - Incluye Toaster para notificaciones.
 * ==========================================================
 */

import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Importación de páginas principales
import Home from './pages/Home'                 // Página principal
import Blog from './pages/Blog'                 // Detalle de un blog
import Layout from './pages/admin/Layout'       // Layout/admin template
import Dashboard from './pages/admin/Dashboard' // Dashboard admin
import Addblog from './pages/admin/Addblog'     // Formulario para añadir blog
import ListBlog from './pages/admin/ListBlog'   // Listado de blogs
import Comments from './pages/admin/Comments'   // Gestión de comentarios
import Login from './components/admin/Login'    // Login admin
import 'quill/dist/quill.snow.css'              // Estilos de Quill editor
import { Toaster } from 'react-hot-toast'       // Componente para notificaciones
import { useAppContext } from './context/AppContext' // Contexto global

const App = () => {
  // Obtenemos el token del contexto para saber si el usuario está autenticado
  const { token } = useAppContext();

  return (
    <div>
      {/* Componente de notificaciones globales */}
      <Toaster/>

      {/* Configuración de rutas de la aplicación */}
      <Routes>
        {/* Página principal */}
        <Route path='/' element={<Home />} />

        {/* Página de detalle de blog */}
        <Route path='/blog/:id' element={<Blog />} />

        {/* Rutas protegidas de administración */}
        <Route path='/admin' element={token ? <Layout /> : <Login />}>
          {/* Ruta por defecto dentro de /admin → Dashboard */}
          <Route index element={<Dashboard />} />
          {/* Ruta para agregar un nuevo blog */}
          <Route path='addBlog' element={<Addblog />} />
          {/* Ruta para listar todos los blogs */}
          <Route path='listBlog' element={<ListBlog />} />
          {/* Ruta para gestionar comentarios */}
          <Route path='comments' element={<Comments />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
