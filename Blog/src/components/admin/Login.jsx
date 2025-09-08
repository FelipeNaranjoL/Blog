import React, { useState } from 'react'

const Login = () => {
    // Estado para almacenar el correo ingresado
    const [email, setEmail] = useState('')
    // Estado para almacenar la contraseña ingresada
    const [password, setPassword] = useState('')

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault() // Previene que la página se recargue al enviar el formulario
        // Aquí iría la lógica para autenticar al usuario (ejemplo: llamada a un backend)
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            {/* Contenedor del formulario con estilos */}
            <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
                <div className='flex flex-col items-center justify-center'>
                    
                    {/* Encabezado del formulario */}
                    <div className='w-full py-6 text-center'>
                        <h1 className='text-3xl font-bold'>Login de administrador</h1>
                        <p className='font-light'>Ingresa tus datos</p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
                        
                        {/* Campo para el correo */}
                        <div className='flex flex-col'>
                            <label>Correo</label>
                            <input 
                                onChange={e => setEmail(e.target.value)} // Actualiza el estado "email"
                                value={email} // Valor controlado del input
                                type="email" 
                                required 
                                placeholder='correo@dominio.com' 
                                className='border-b-2 border-gray-300 p-2 outline-none mb-6' 
                            />
                        </div>

                        {/* Campo para la contraseña */}
                        <div className='flex flex-col'>
                            <label>Contraseña</label>
                            <input 
                                onChange={e => setPassword(e.target.value)} // Actualiza el estado "password"
                                value={password} // Valor controlado del input
                                type="password" 
                                required 
                                placeholder='tu contraseña' 
                                className='border-b-2 border-gray-300 p-2 outline-none mb-6' 
                            />
                        </div>

                        {/* Botón de envío */}
                        <button 
                            className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all' 
                            type="submit"
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
