/**
 * ==========================================================
 * Componente: Navbar.tsx
 * Descripción:
 * - Barra de navegación principal del sitio.
 * - Incluye logo y botón de acceso al panel de administración o login.
 * - Utiliza imágenes de `assets` y navegación con `react-router-dom`.
 * ==========================================================
 */

import React from 'react'
// Importamos imágenes y recursos (logo, iconos, etc.)
import { assets } from '../assets/assets'
// Hook para navegación programática entre rutas
import { useNavigate } from 'react-router-dom'
// Importamos contexto global para obtener token y navegación
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
    // Extraemos de AppContext el token y la función navigate
    const { navigate, token } = useAppContext(); 

    return (
        // Contenedor principal de la navbar
        <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
            
            {/* Logo: redirige a la página de inicio al hacer click */}
            <img 
                onClick={() => navigate('/')} // Navegación a home
                src={assets.logo}            // Imagen del logo
                alt="Logo" 
                className='w-32 sm:w-44 cursor-pointer' // Estilos responsivos y cursor pointer
            />

            {/* Botón de acceso al panel de administración o login */}
            <button 
                onClick={() => navigate('/admin')} // Redirige al dashboard
                className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'
            >
                {/* Texto del botón: "Dashboard" si hay token, sino "Login" */}
                {token ? 'Dashboard' : 'Login'}
                {/* Icono decorativo de flecha */}
                <img src={assets.arrow} className='w-3' alt="Flecha" />
            </button>
        </div>
    )
}

export default Navbar
