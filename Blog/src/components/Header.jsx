/**
 * ==========================================================
 * Componente: Header.tsx
 * Descripción: Encabezado principal del blog.
 * Incluye un banner con texto destacado, un subtítulo y un 
 * formulario de búsqueda. Usa imágenes decorativas desde `assets`.
 * ==========================================================
 */

import React, { useRef } from 'react'
// Importamos assets como imágenes e iconos
import { assets } from '../assets/assets'
// Importamos el contexto global para manejar estado de búsqueda
import { useAppContext } from '../context/AppContext'

const Header = () => {
    // Extraemos del contexto el input global y la función para actualizarlo
    const { setInput, input } = useAppContext();
    // Referencia al input de búsqueda
    const inputRef = useRef();

    // Función que maneja el envío del formulario de búsqueda
    const onSubmitHandler = async (e) => {
        e.preventDefault(); // Prevenimos el comportamiento por defecto
        // Actualizamos el estado global con el valor ingresado
        setInput(inputRef.current.value)
    }

    // Función para limpiar el input de búsqueda
    const onClear = () => {
        setInput('')                // Limpiamos el estado global
        inputRef.current.value = ''; // Limpiamos el input visible
    }

    return (
        <div className='mx-8 sm:mx-16 xl:mx-24 relative'>

            {/* Contenedor central con texto */}
            <div className='text-center mt-20 mb-8'>

                {/* Franja destacada superior */}
                <div
                    className='inline-flex items-center justify-center gap-4 
                               px-6 py-1.5 mb-8 border border-primary/40 
                               bg-primary/10 rounded-full text-sm text-primary'
                >
                    {/* Texto destacado */}
                    <p>Un espacio donde la documentación converge en un solo lugar.</p>
                    {/* Icono decorativo */}
                    {/* <img
                        src={assets.star_icon}
                        className='w-2.5'
                        alt="icono destacado"
                    /> */}
                </div>

                {/* Título principal */}
                <h1
                    className='text-3xl sm:text-6xl font-semibold sm:leading-16 
                               text-gray-700'
                >
                    Aprende algo nuevo, publícalo y compártelo con <span className='text-primary'>otros.</span><br />

                </h1>

                {/* Subtítulo / descripción */}
                <p
                    className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs 
                               text-gray-500'
                >
                    Publica dentro de las tecnologías registradas y comparte tus hallazgos y conocimientos para que otros desarrolladores se mantengan al día en el mundo de la programación.                </p>

                {/* Formulario de búsqueda */}
                <form
                    onSubmit={onSubmitHandler} // Llama a la función al enviar
                    className='flex justify-between max-w-lg max-sm:scale-75 
                               mx-auto border border-gray-300 bg-white 
                               rounded overflow-hidden'
                >
                    {/* Input de búsqueda */}
                    <input
                        ref={inputRef}            // Referencia para acceder al valor
                        type="text"
                        placeholder='Buscar contenido'
                        required
                        className='w-full pl-4 outline-none'
                    />
                    {/* Botón de búsqueda */}
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

            {/* Botón de limpiar, solo se muestra si hay texto en input */}
            <div className='text-center'>
                {input &&
                    <button
                        onClick={onClear}
                        className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'
                    >
                        Limpiar
                    </button>
                }
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
