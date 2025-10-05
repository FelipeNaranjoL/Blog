/**
 * ==========================================================
 * Componente: Login.jsx
 * Descripción:
 * - Formulario de login para el panel de administración.
 * - Maneja la autenticación mediante email y contraseña.
 * - Almacena token en localStorage y lo setea en axios para futuras peticiones.
 * ==========================================================
 */

import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext' // Contexto global de la app
import toast from 'react-hot-toast' // Para mostrar notificaciones tipo toast

const Login = () => {

    const { axios, setToken } = useAppContext(); // Extrae axios y setToken desde el contexto

    // Estado controlado para almacenar el correo ingresado
    const [email, setEmail] = useState('')

    // Estado controlado para almacenar la contraseña ingresada
    const [password, setPassword] = useState('')

    // Función que maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault() // Evita que la página se recargue al enviar el formulario

        try {
            // Llamada POST al endpoint de login con email y password
            const { data } = await axios.post('/api/admin/login', { email, password })

            if (data.success) {
                // Si la autenticación es exitosa:
                setToken(data.token)                        // Actualiza token en el contexto global
                localStorage.setItem('token', data.token)   // Guarda token en localStorage
                axios.defaults.headers.common['Authorization'] = data.token // Setea token en axios
                toast.success('Login exitoso')              // Mensaje de éxito
            } else {
                toast.error(data.message)                   // Mensaje de error si falla
            }
        } catch (error) {
            toast.error(error.message)                     // Mensaje de error por fallo en la petición
        }
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            {/* Contenedor del formulario */}
            <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
                <div className='flex flex-col items-center justify-center'>

                    {/* Encabezado del formulario */}
                    <div className='w-full py-6 text-center'>
                        <h1 className='text-3xl font-bold'>Login de administrador</h1>
                        <p className='font-light'>Ingresa tus datos</p>
                    </div>

                    {/* Formulario controlado */}
                    <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>

                        {/* Campo correo */}
                        <div className='flex flex-col'>
                            <label>Correo</label>
                            <input 
                                onChange={e => setEmail(e.target.value)} // Actualiza el estado "email"
                                value={email}                             // Valor controlado del input
                                type="email" 
                                required 
                                placeholder='correo@dominio.com' 
                                className='border-b-2 border-gray-300 p-2 outline-none mb-6' 
                            />
                        </div>

                        {/* Campo contraseña */}
                        <div className='flex flex-col'>
                            <label>Contraseña</label>
                            <input 
                                onChange={e => setPassword(e.target.value)} // Actualiza el estado "password"
                                value={password}                             // Valor controlado del input
                                type="password" 
                                required 
                                placeholder='tu contraseña' 
                                className='border-b-2 border-gray-300 p-2 outline-none mb-6' 
                            />
                        </div>

                        {/* Botón de envío */}
                        <button 
                            type="submit"
                            className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all'
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
