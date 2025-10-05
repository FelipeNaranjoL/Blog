/**
 * ==========================================================
 * Componente: CommentTableItem.jsx
 * Descripción:
 * - Representa una fila de la tabla de comentarios en el panel admin.
 * - Muestra información del comentario: blog relacionado, nombre
 *   del usuario, contenido, fecha y acciones de aprobación/eliminación.
 * ==========================================================
 */

import React from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

/**
 * Props:
 * - comment: objeto que contiene los datos del comentario
 *   { blog, createdAt, _id, name, content, isAprobed }
 * - fetchComments: función para refrescar la lista de comentarios
 *   después de aprobar o eliminar un comentario.
 */
const CommentTableItem = ({ comment, fetchComments }) => {
    const { blog, createdAt, _id } = comment
    const BlogDate = new Date(createdAt) // Convierte createdAt en objeto Date
    const { axios } = useAppContext();

    // Aprobar comentario
    const approveComment = async () => {
        try {
            const { data } = await axios.post('/api/admin/approve-comment', { id: _id })
            if (data.success) {
                toast.success(data.message)
                fetchComments() // Refresca la lista
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Eliminar comentario
    const deleteComment = async () => {
        try {
            const confirm = window.confirm('¿Estás seguro de querer eliminar este comentario?');
            if (!confirm) return;
            const { data } = await axios.post('/api/admin/delete-comment', { id: _id })
            if (data.success) {
                toast.success(data.message)
                fetchComments() // Refresca la lista
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <tr className='border-y border-gray-300'>
            {/* Columna: Información del comentario */}
            <td className='px-6 py-4'>
                <b className='font-medium text-black'>Blog</b> : {blog.title}
                <br /><br />
                <b className='font-medium text-black'>Nombre</b> : {comment.name}
                <br />
                <b className='font-medium text-black'>Comentario</b> : {comment.content}
            </td>

            {/* Columna: Fecha de creación (oculta en pantallas pequeñas) */}
            <td className='px-6 py-4 max-sm:hidden'>
                {BlogDate.toLocaleDateString()}
            </td>

            {/* Columna: Acciones */}
            <td className='px-6 py-4'>
                <div className='inline-flex items-center gap-4'>
                    {/* Mostrar botón de aprobar si aún no está aprobado */}
                    {!comment.isAprobed ?
                        <img
                            onClick={approveComment}
                            src={assets.tick_icon}
                            alt="Aprobar"
                            className='w-5 hover:scale-110 transition-all cursor-pointer'
                        />
                        :
                        /* Mostrar etiqueta de aprobado si ya está aprobado */
                        <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>
                            Aprobado
                        </p>
                    }

                    {/* Icono para eliminar comentario */}
                    <img
                        onClick={deleteComment}
                        src={assets.bin_icon}
                        alt="Eliminar"
                        className='w-5 hover:scale-110 transition-all cursor-pointer'
                    />
                </div>
            </td>
        </tr>
    )
}

export default CommentTableItem
