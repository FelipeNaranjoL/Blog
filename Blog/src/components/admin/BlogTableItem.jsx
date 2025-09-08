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
import { assets } from '../../assets/assets'

/**
 * Props:
 * - blog: objeto con los datos del blog (title, createdAt, isPublished, etc.)
 * - fetchBlogs: función (aún no usada aquí) para refrescar la lista de blogs tras acciones.
 * - index: posición del blog en la tabla (se muestra como número de fila).
 */
const BlogTableItem = ({ blog, fetchBlogs, index }) => {
    const { title, createdAt } = blog
    const BlogDate = new Date(createdAt) // Convertimos la fecha a objeto Date

    return (
        <tr className='border-y border-gray-300'>
            {/* Columna: índice del blog */}
            <th className='px-2 py-4'>{index}</th>

            {/* Columna: título del blog (oculto en pantallas pequeñas) */}
            <td className='px-2 py-4 max-sm:hidden'>{title}</td>

            {/* Columna: fecha de creación formateada (oculta en pantallas pequeñas) */}
            <td className='px-2 py-4 max-sm:hidden'>{BlogDate.toLocaleDateString('es-ES')}</td>

            {/* Columna: estado de publicación */}
            <td className='px-2 py-4 max-sm:hidden'>
                <p className={blog.isPublished ? "text-green-600" : "text-orange-700"}>
                    {blog.isPublished ? 'Publicado' : 'Sin publicar'}
                </p>
            </td>

            {/* Columna: acciones */}
            <td className='px-2 py-4 flex text-xs gap-3'>
                {/* Botón para cambiar estado de publicación (no implementado aún) */}
                <button className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>
                    {blog.isPublished ? 'Sin publicar' : 'Publicado'}
                </button>

                {/* Icono para eliminar el blog (no implementado aún) */}
                <img
                    src={assets.cross_icon}
                    alt="Eliminar"
                    className='w-8 hover:scale-110 transition-all cursor-pointer'
                />
            </td>
        </tr>
    )
}

export default BlogTableItem
