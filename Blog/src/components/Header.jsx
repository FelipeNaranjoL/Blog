/**
 * ==========================================================
 * Componente: Header.tsx
 * Descripción: Encabezado principal del blog.
 * Incluye un banner con texto destacado, un subtítulo y un 
 * formulario de búsqueda. Usa imágenes decorativas desde `assets`.
 * ==========================================================
 */

import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
            {/* Contenedor central con texto */}
            <div className='text-center mt-20 mb-8'>
                
                {/* Franja destacada superior */}
                <div 
                    className='inline-flex items-center justify-center gap-4 
                               px-6 py-1.5 mb-4 border border-primary/40 
                               bg-primary/10 rounded-full text-sm text-primary'
                >
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
                    <img 
                        src={assets.star_icon} 
                        className='w-2.5' 
                        alt="icono destacado" 
                    />
                </div>

                {/* Título principal */}
                <h1 
                    className='text-3xl sm:text-6xl font-semibold sm:leading-16 
                               text-gray-700'
                >
                    Lorem ipsum <span className='text-primary'>dolor</span><br /> 
                    sit amet.
                </h1>

                {/* Subtítulo / descripción */}
                <p 
                    className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs 
                               text-gray-500'
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Qui debitis quos neque consequuntur autem ratione dolorem 
                    magni enim quas dolorum?
                </p>

                {/* Formulario de búsqueda */}
                <form 
                    className='flex justify-between max-w-lg max-sm:scale-75 
                               mx-auto border border-gray-300 bg-white 
                               rounded overflow-hidden'
                >
                    <input 
                        type="text" 
                        placeholder='Buscar contenido' 
                        required 
                        className='w-full pl-4 outline-none'
                    />
                    <button 
                        type="submit"
                        className='bg-primary text-white px-8 py-2 m-1.5 
                                   rounded hover:scale-105 transition-all 
                                   cursor-pointer'
                    >
                        Buscar
                    </button>
                </form>
            </div>

            {/* Imagen de fondo decorativa */}
            <img 
                src={assets.gradientBackground} 
                className='absolute -top-50 -z-1 opacity-50' 
                alt="fondo decorativo" 
            />
        </div>
    )
}

export default Header
