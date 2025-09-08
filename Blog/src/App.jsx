import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Importación de páginas principales
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import Addblog from './pages/admin/Addblog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'
import Login from './components/admin/Login'
import 'quill/dist/quill.snow.css'

const App = () => {
  return (
    <div>
      {/* Configuración de rutas de la aplicación */}
      <Routes>
        {/* Página principal */}
        <Route path='/' element={<Home />} />

        {/* Página de detalle de blog, con parámetro dinámico :id */}
        <Route path='/blog/:id' element={<Blog />} />

        {/* Rutas protegidas de administración */}
        <Route path='/admin' element={true ? <Layout/> : <Login/>}>
          {/* Ruta por defecto de administración */}
          <Route index element={<Dashboard/>}/>
          {/* Ruta para agregar un nuevo blog */}
          <Route path='addBlog' element={<Addblog/>}/>
          {/* Ruta para listar todos los blogs */}
          <Route path='listBlog' element={<ListBlog/>}/>
          {/* Ruta para gestionar comentarios */}
          <Route path='comments' element={<Comments/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
