/**
 * ==========================================================
 * Componente: BlogTableItem.jsx
 * Descripción:
 * - Representa una fila de la tabla de blogs en el panel admin.
 * - Muestra información básica de un post: índice, título,
 *   fecha de creación, estado de publicación y acciones.
 * ==========================================================
 */

import React from 'react'
import { assets } from '../../assets/assets' // Iconos e imágenes
import { useAppContext } from '../../context/AppContext' // Contexto con axios
import toast from 'react-hot-toast' // Para mostrar notificaciones

/**
 * Props:
 * - blog: objeto con los datos del blog (title, createdAt, isPublished, etc.)
 * - fetchBlogs: función para refrescar la lista de blogs tras eliminar o actualizar
 * - index: posición del blog en la tabla (se muestra como número de fila)
 */
const BlogTableItem = ({ blog, fetchBlogs, index }) => {
    const { title, createdAt } = blog
    const BlogDate = new Date(createdAt) // Convertimos la fecha a objeto Date
    const { axios } = useAppContext(); // Extraemos axios desde el contexto

    // Función para eliminar un blog
    const deleteBlog = async () => {
        const confirm = window.confirm('¿Seguro que quieres eliminar este blog?') // Confirmación
        if (!confirm) return;
        try {
            const { data } = await axios.post('api/blog/delete', { id: blog._id }) // Petición DELETE
            if (data.success) {
                toast.success(data.message) // Notificación de éxito
                await fetchBlogs() // Refresca la lista de blogs
            } else {
                toast.error(data.message) // Notificación si hay error
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Función para alternar el estado de publicación
    const togglePublish = async () => {
        try {
            const { data } = await axios.post('api/blog/toggle-publish', { id: blog._id }) // Petición toggle
            if (data.success) {
                toast.success(data.message) // Notificación de éxito
                await fetchBlogs() // Refresca la lista de blogs
            } else {
                toast.error(data.message) // Notificación si hay error
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <tr className='border-y border-gray-300'>
            {/* Columna: índice del blog */}
            <th className='px-2 py-4 text-black'>{index}</th>

            {/* Columna: título del blog (oculto en pantallas pequeñas) */}
            <td className='px-2 py-4 max-sm:hidden text-black'>{title}</td>

            {/* Columna: fecha de creación formateada (oculta en pantallas pequeñas) */}
            <td className='px-2 py-4 max-sm:hidden text-black'>{BlogDate.toLocaleDateString('es-ES')}</td>

            {/* Columna: estado de publicación */}
            <td className='px-2 py-4 max-sm:hidden'>
                <p className={blog.isPublished ? "text-green-600" : "text-red-700"}>
                    {blog.isPublished ? 'Publicado' : 'Sin publicar'}
                </p>
            </td>

            {/* Columna: acciones */}
            <td className='px-2 py-4 flex text-xs gap-3'>
                {/* Botón para cambiar estado de publicación */}
                <button 
                    onClick={togglePublish} 
                    className='border px-2 py-0.5 mt-1 rounded cursor-pointer text-black'
                >
                    {blog.isPublished ? 'Despublicar' : 'Publicar'}
                </button>

                {/* Icono para eliminar el blog */}
                <img
                    onClick={deleteBlog}
                    src={assets.cross_icon}
                    alt="Eliminar"
                    className='w-10 hover:scale-110 transition-all cursor-pointer'
                />
            </td>
        </tr>
    )
}

export default BlogTableItem
