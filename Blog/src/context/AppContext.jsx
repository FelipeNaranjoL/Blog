// Importamos React Context API y hooks
import { useContext, createContext, useEffect } from "react";
import { useState } from "react";
// Importamos axios para llamadas HTTP
import axios from 'axios';
// Importamos useNavigate para navegación programática
import { useNavigate } from 'react-router-dom';
// Importamos toast para notificaciones
import toast from "react-hot-toast";

// Configuramos la URL base de Axios usando variable de entorno
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Creamos el contexto global
const AppContext = createContext();

// Componente proveedor que envuelve toda la aplicación
// Recibe "children" para renderizar todos los componentes dentro del Provider
export const AppProvider = ({ children }) => {

    // Hook para navegar entre rutas
    const navigate = useNavigate();

    // Estado global para token de autenticación
    const [token, setToken] = useState(null);

    // Estado global para almacenar la lista de blogs
    const [blogs, setBlogs] = useState([]);

    // Estado global para un input (por ejemplo búsqueda o filtros)
    const [input, setInput] = useState("");

    // Función para obtener todos los blogs desde el backend
    const fetchBlogs = async () => {
        try {
            // Petición GET a /api/blog/all
            const { data } = await axios.get('/api/blog/all');
            // Si la respuesta es exitosa, guardamos los blogs en el estado
            if(data.success) {
                setBlogs(data.blogs);
            } else {
                // Si no, mostramos mensaje de error
                toast.error(data.message);
            }
        } catch (error) {
            // Manejo de errores de red o servidor
            toast.error(error.message);
        }
    }

    // useEffect que se ejecuta al montar el contexto
    useEffect(() => { 
        // Llamamos a fetchBlogs para cargar los blogs al inicio
        fetchBlogs();

        // Verificamos si hay token guardado en localStorage
        const token = localStorage.getItem('token');
        if(token){
            // Guardamos el token en el estado global
            setToken(token);
            // Lo agregamos a los headers de axios para autenticación
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }
    }, [])

    // Objeto con todos los valores que queremos compartir globalmente
    const value = {
        axios,      // Instancia de axios con baseURL y headers
        navigate,   // Función para navegar entre rutas
        token,      // Token de usuario
        setToken,   // Función para actualizar token
        blogs,      // Lista de blogs
        setBlogs,   // Función para actualizar blogs
        input,      // Valor de input global
        setInput    // Función para actualizar input
    }

    // Retornamos el Provider que envuelve toda la aplicación
    return (
        <AppContext.Provider value={value}>
            {children} {/* Renderiza todos los componentes hijos */}
        </AppContext.Provider>
    )
}

// Hook personalizado para consumir el contexto de forma sencilla
export const useAppContext = () => {
    return useContext(AppContext);
}
