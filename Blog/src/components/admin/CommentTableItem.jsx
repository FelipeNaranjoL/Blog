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

/**
 * Props:
 * - comment: objeto que contiene los datos del comentario
 *   { blog, createdAt, _id, name, content, isAprobed }
 * - fetchComments: función (aún no implementada en este componente)
 *   que sirve para refrescar la lista de comentarios tras acciones.
 */
const CommentTableItem = ({ comment, fetchComments }) => {
    const { blog, createdAt } = comment
    const BlogDate = new Date(createdAt) // Convertimos la fecha a objeto Date

    return (
        <tr className='border-y border-gray-300'>
            {/* Columna: Información del comentario */}
            <td className='px-6 py-4'>
                <b className='font-medium text-gray-600'>Blog</b> : {blog.title}
                <br /><br />
                <b className='font-medium text-gray-600'>Nombre</b> : {comment.name}
                <br />
                <b className='font-medium text-gray-600'>Comentario</b> : {comment.content}
            </td>

            {/* Columna: Fecha de creación (oculta en móviles pequeños) */}
            <td className='px-6 py-4 max-sm:hidden'>
                {BlogDate.toLocaleDateString()} 
            </td>

            {/* Columna: Acciones */}
            <td className='px-6 py-4'>
                <div className='inline-flex items-center gap-4'>
                    {/* Si NO está aprobado → mostrar icono para aprobar */}
                    {!comment.isAprobed ? (
                        <img
                            src={assets.tick_icon}
                            alt="Aprobar"
                            className='w-5 hover:scale-110 transition-all cursor-pointer'
                        />
                    ) : (
                        /* Si ya está aprobado → mostrar etiqueta de estado */
                        <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>
                            Aprobado
                        </p>
                    )}

                    {/* Icono para eliminar comentario */}
                    <img
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
