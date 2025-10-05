import React from 'react'
// Importa assets (imágenes, iconos, logo, etc.) y componentes de routing y sidebar
import { assets } from '../../assets/assets'
import { Outlet } from 'react-router-dom' // Renderiza rutas hijas en layout
import Sidebar from '../../components/admin/Sidebar' // Menú lateral
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
    // Extraemos axios, setToken y navigate del contexto global
    const { axios, setToken, navigate } = useAppContext()

    // Función que cierra la sesión del usuario
    const logout = () => {
        // Eliminamos token del localStorage
        localStorage.removeItem('token')
        // Limpiamos la cabecera Authorization de axios
        axios.defaults.headers.common['Authorization'] = null
        // Actualizamos el estado global del token
        setToken(null)
        // Redirigimos a la página principal
        navigate('/')
    }

    return (
        <>
            {/* -------------------- Barra superior -------------------- */}
            <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
                {/* Logo que redirige a la página principal al hacer click */}
                <img
                    src={assets.logo}
                    alt="Logo"
                    className='w-32 sm:w-40 cursor-pointer'
                    onClick={() => navigate('/')}
                />

                {/* Botón para cerrar sesión */}
                <button
                    onClick={logout}
                    className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'
                >
                    Cerrar sesión
                </button>
            </div>

            {/* -------------------- Contenedor principal -------------------- */}
            <div className='flex h-[calc(100vh-70px)]'>
                {/* Sidebar con menú de navegación del panel admin */}
                <Sidebar />

                {/* Outlet renderiza las rutas hijas dentro del layout */}
                <Outlet />
            </div>
        </>
    )
}

export default Layout
