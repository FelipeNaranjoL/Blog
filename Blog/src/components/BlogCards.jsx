/**
 * ==========================================================
 * Componente: BlogCards.tsx
 * Descripción: Tarjeta para mostrar la previsualización de un 
 * post del blog. Incluye imagen, categoría, título y descripción.
 * Al hacer click redirige a la ruta del post usando react-router.
 * ==========================================================
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Props:
 *  - blog: objeto con los datos del post.
 *    { title, description, category, image, _id }
 */
const BlogCards = ({ blog }) => {
    // Desestructuración de props
    const { title, description, category, image, _id } = blog;

    // Hook de navegación para redirigir a la página del post
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/blog/${_id}`)}
            className='w-full rounded-lg overflow-hidden shadow 
                       hover:scale-105 hover:shadow-primary/25 
                       duration-300 cursor-pointer'
        >
            {/* Imagen de portada del blog */}
            <img 
                src={image} 
                alt={`Imagen del blog: ${title}`}  
                className='aspect-video object-cover'
            />

            {/* Categoría del post */}
            <span 
                className='ml-5 mt-4 px-3 inline-block bg-primary/20 
                           rounded-full text-primary text-xs'
            >
                {category}
            </span>

            {/* Contenido de la tarjeta */}
            <div className='p-5'>
                <h5 className='mb-2 font-medium text-gray-900'>
                    {title}
                </h5>

                {/* Resumen del contenido */}
                <p 
                    className='mb-3 text-xs text-gray-600'
                    dangerouslySetInnerHTML={{
                        __html: description.slice(0, 80) + "..."
                    }}
                />
            </div>
        </div>
    )
}

export default BlogCards
