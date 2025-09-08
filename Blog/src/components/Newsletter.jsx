/**
 * ==========================================================
 * Componente: Newsletter.tsx
 * Descripción: Sección de suscripción para el blog.
 * Incluye título, descripción y un formulario con input y botón.
 * Estilos aplicados con utilidades de TailwindCSS.
 * ==========================================================
 */

import React from 'react'

const Newsletter = () => {
    return (
        <div
            className='flex flex-col items-center justify-center text-center 
                       space-y-2 my-32'
        >
            {/* Título principal */}
            <h1 className='md:text-4xl text-2xl font-semibold'>
                Lorem ipsum dolor sit amet.
            </h1>

            {/* Descripción corta */}
            <p className='md:text-lg text-gray-500/70 pb-8'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Perferendis dolore quae architecto?
            </p>

            {/* Formulario de suscripción */}
            <form
                className='flex items-center justify-between 
                           max-w-2xl w-full md:h-13 h-12'
            >
                {/* Input de correo electrónico */}
                <input
                    className='border border-gray-300 rounded-md h-full 
                               border-r-0 outline-none w-full 
                               rounded-r-none px-3 text-gray-500'
                    type="text"
                    placeholder='Ingrese su correo'
                />

                {/* Botón de suscripción */}
                <button
                    type='submit'
                    className='md:px-12 px-8 h-full text-white bg-primary/80 
                               hover:bg-primary transition-all cursor-pointer 
                               rounded-md rounded-l-none'
                >
                    Incribirse
                </button>
            </form>
        </div>
    )
}

export default Newsletter
