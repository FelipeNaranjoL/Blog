import React, { useEffect, useState } from 'react'
// Importa los datos de los blogs y el componente de tabla de administración
import { blog_data } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';

const ListBlog = () => {
  // Estado para almacenar los blogs
  const [blogs, setBlogs] = useState([]);

  // Función para obtener los blogs (simula fetch desde backend)
  const fetchBlogs = async () => {
    setBlogs(blog_data)
  }

  // useEffect para cargar los blogs al montar el componente
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
          <thead className='text-xs text-gray-600 text-left uppercase'>
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
                  key={blog._id} 
                  blog={blog} 
                  fetchBlogs={fetchBlogs} 
                  index={index + 1} 
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
