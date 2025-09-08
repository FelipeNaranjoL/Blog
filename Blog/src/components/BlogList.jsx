/**
 * ==========================================================
 * Componente: BlogList.tsx
 * Descripción: Renderiza la lista de posts del blog.
 * Permite filtrar por categorías (All, Tech, Lifestyle, etc.)
 * usando botones dinámicos. 
 * La animación de selección se maneja con Framer Motion.
 * ==========================================================
 */

import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { motion } from "motion/react"
import BlogCards from './BlogCards'

const BlogList = () => {
    // Estado para la categoría seleccionada
    const [menu, setMenu] = useState("All")

    return (
        <div>
            {/* Selector de categorías */}
            <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
                {blogCategories.map((item) => (
                    <div key={item} className='relative'>
                        <button 
                            onClick={() => setMenu(item)} 
                            className={`cursor-pointer text-gray-500 
                                        ${menu === item && 'text-white px-4 pt-0.5'}`}
                        >
                            {item}

                            {/* Indicador animado de la categoría activa */}
                            {menu === item && (
                                <motion.div 
                                    layoutId='underline'
                                    transition={{
                                        type: "spring", 
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

            {/* Lista de tarjetas de blogs */}
            <div 
                className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 
                           gap-8 mb-24 sm:mx-16 xl:mx-40'
            >
                {blog_data
                    // Filtra los blogs según categoría seleccionada
                    .filter((blog) => menu === "All" ? true : blog.category === menu)
                    // Renderiza cada tarjeta
                    .map((blog) => (
                        <BlogCards key={blog._id} blog={blog} />
                    ))
                }
            </div>
        </div>
    )
}

export default BlogList
