/**
 * ==========================================================
 * Componente: BlogList.tsx
 * Descripción: 
 * - Renderiza la lista de posts del blog.
 * - Permite filtrar por categorías (All, Tech, Lifestyle, etc.)
 *   usando botones dinámicos.
 * - Aplica una animación de selección de categoría con Framer Motion.
 * ==========================================================
 */

import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets' // Datos y categorías de ejemplo
import { motion } from "motion/react" // Librería para animaciones fluidas
import BlogCards from './BlogCards' // Componente que muestra cada tarjeta individual del blog
import { useAppContext } from '../context/AppContext' // Contexto global para acceder a datos y filtros

const BlogList = () => {
    // 📌 Estado local para la categoría seleccionada
    const [menu, setMenu] = useState("All");

    // 📌 Obtenemos del contexto global la lista de blogs y el valor del buscador
    const { blogs, input } = useAppContext();

    // 📌 Función que filtra los blogs según el texto ingresado en el buscador
    const filteredBlogs = () => {
        // Si no hay texto en el input, retornamos todos los blogs
        if (input === '') {
            return blogs
        }

        // Filtramos por coincidencias en título o categoría (sin distinción de mayúsculas)
        return blogs.filter((blog) =>
            blog.title.toLowerCase().includes(input.toLowerCase()) ||
            blog.category.toLowerCase().includes(input.toLowerCase())
        )
    }

    return (
        <div>
            {/* ============================
                SECCIÓN: Selector de Categorías
                ============================ */}
            <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
                {blogCategories.map((item) => (
                    <div key={item} className='relative'>
                        {/* Botón de categoría */}
                        <button
                            onClick={() => setMenu(item)} // Cambia la categoría activa
                            className={`cursor-pointer text-gray-500 
                                        ${menu === item && 'text-white px-4 pt-0.5'}`}
                        >
                            {item}

                            {/* Indicador animado de la categoría activa */}
                            {menu === item && (
                                <motion.div
                                    layoutId='underline' // Permite animar el mismo elemento entre categorías
                                    transition={{
                                        type: "spring", // Animación tipo resorte
                                        stiffness: 120,
                                        damping: 20
                                    }}
                                    className='absolute left-0 right-0 top-0 h-7 
                                               -z-1 bg-primary rounded-full'
                                ></motion.div>
                            )}
                        </button>
                    </div>
                ))}
            </div>

            {/* ============================
                SECCIÓN: Lista de Blogs
                ============================ */}
            <div
                className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 
                           gap-8 mb-24 sm:mx-16 xl:mx-40'
            >
                {filteredBlogs()
                    // Filtra los blogs por categoría seleccionada (o todos si es "All")
                    .filter((blog) => menu === "All" ? true : blog.category === menu)
                    // Renderiza una tarjeta por cada blog filtrado
                    .map((blog) => (
                        <BlogCards key={blog._id} blog={blog} />
                    ))
                }
            </div>
        </div>
    )
}

export default BlogList
