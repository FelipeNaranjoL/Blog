import React, { useEffect, useState } from 'react'
// Importa los datos de ejemplo del dashboard y el componente para las filas de la tabla de blogs
import { assets, dashboard_data } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'

const Dashboard = () => {

  // Estado que almacena los datos del dashboard: cantidad de blogs, comentarios, borradores y últimos blogs
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  })

  // Función para obtener los datos del dashboard (simulado con datos locales)
  const fetchDashboard = async () => {
    setDashboardData(dashboard_data)
  }

  // useEffect que ejecuta fetchDashboard al montar el componente
  useEffect(() => {
    fetchDashboard()
  }, [])

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
      {/* Tarjetas con estadísticas generales */}
      <div className='flex flex-wrap gap-4'>
        {/* Tarjeta de blogs */}
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_1} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboard_data.blogs}</p>
            <p className='text-gray-400 font-light'>Blogs</p>
          </div>
        </div>

        {/* Tarjeta de comentarios */}
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_2} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboard_data.comments}</p>
            <p className='text-gray-400 font-light'>Comentarios</p>
          </div>
        </div>

        {/* Tarjeta de borradores */}
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_3} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboard_data.drafts}</p>
            <p className='text-gray-400 font-light'>Borradores</p>
          </div>
        </div>
      </div>

      {/* Sección de últimos blogs */}
      <div>
        <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Ultimos blogs</p>
        </div>

        {/* Tabla que muestra los últimos blogs */}
        <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs text-gray-600 text-left uppercase'>
              <tr>
                <th scope='col' className='px-2 py-4 xl:px-6'> # </th>
                <th scope='col' className='px-2 py-4'> Titulo </th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'> Fecha </th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'> Estado </th>
                <th scope='col' className='px-2 py-4'> Acciones </th>
              </tr>
            </thead>
            <tbody>
              {/* Mapea los últimos blogs y los renderiza usando BlogTableItem */}
              {dashboardData.recentBlogs.map((blog, index) => {
                return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
