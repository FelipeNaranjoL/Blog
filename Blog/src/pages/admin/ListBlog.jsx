import React, { useEffect, useState } from 'react'
// Importa los datos de los blogs y el componente de tabla de administración
import { blog_data } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast'; // Para mostrar notificaciones

const ListBlog = () => {
  // Estado para almacenar los blogs obtenidos desde el backend
  const [blogs, setBlogs] = useState([]);
  const {axios} = useAppContext() // Extraemos axios desde el contexto

  // Función para obtener todos los blogs desde la API del admin
  const fetchBlogs = async () => {
    try {
      const {data} = await axios.get('api/admin/blogs') // Petición GET
      if(data.success){
        setBlogs(data.blogs) // Guardamos los blogs en el estado
      }else{
        toast.error(data.message) // Muestra un toast si falla
      }
    } catch (error) {
      toast.error(error.message) // Notificación si hay error en la petición
    }
  }

  // useEffect para cargar los blogs cuando el componente se monta
  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      {/* Título de la sección */}
      <h1>Todos los blogs</h1>

      {/* Contenedor de la tabla */}
      <div className='relative h-4/5 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
        <table className='w-full text-sm text-gray-500'>

          {/* Encabezado de la tabla */}
          <thead className='text-xs text-black text-left uppercase'>
            <tr>
              <th scope='col' className='px-2 py-4 xl:px-6'> # </th>
              <th scope='col' className='px-2 py-4'> Titulo </th>
              <th scope='col' className='px-2 py-4 max-sm:hidden'> Fecha </th>
              <th scope='col' className='px-2 py-4 max-sm:hidden'> Estado </th>
              <th scope='col' className='px-2 py-4'> Acciones </th>
            </tr>
          </thead>

          {/* Cuerpo de la tabla con los blogs */}
          <tbody>
            {blogs.map((blog, index) => {
              return (
                <BlogTableItem 
                  key={blog._id}         // Clave única para React
                  blog={blog}            // Datos del blog
                  fetchBlogs={fetchBlogs} // Función para refrescar lista tras acciones
                  index={index + 1}      // Número de fila
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListBlog
