/**
 * ==========================================================
 * Componente: Loading.jsx
 * Descripción: Spinner de carga centrado en pantalla completa.
 * Se utiliza para indicar que la página o los datos están 
 * siendo cargados.
 * ==========================================================
 */

import React from 'react'

const Loading = () => {
    return (
        // Contenedor que centra el spinner vertical y horizontalmente
        <div className='flex justify-center items-center h-screen'>
            {/* Spinner animado con TailwindCSS */}
            <div
                className='animate-spin rounded-full h-16 w-16 
                       border-4 border-t-white border-gray-700'>
            </div>
        </div>
    )
}

export default Loading
