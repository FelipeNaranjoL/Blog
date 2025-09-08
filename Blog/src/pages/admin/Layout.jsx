import React from 'react'
// Importa assets (imágenes, iconos, logo, etc.) y componentes de routing y sidebar
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'

const Layout = () => {

    // Hook de React Router para navegación programática
    const navigate = useNavigate()

    // Función para cerrar sesión y redirigir a la página principal
    const logout = () =>{
        navigate('/')
    }

    return (
        <>
            {/* Barra superior con logo y botón de cerrar sesión */}
            <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
                {/* Logo que al hacer click redirige a la página principal */}
                <img src={assets.logo} alt="" className='w-32 sm:w-40 cursor-pointer' onClick={() => navigate('/')} />
                {/* Botón para cerrar sesión */}
                <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Cerrar sesion</button>
            </div>

            {/* Contenedor principal: Sidebar y contenido dinámico (Outlet) */}
            <div className='flex h-[calc(100vh-70px)]'>
                {/* Sidebar con navegación de administración */}
                <Sidebar/>
                {/* Componente Outlet para renderizar rutas hijas */}
                <Outlet/>
            </div>
        </>
    )
}

export default Layout
