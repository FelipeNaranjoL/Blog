import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
    return (
        // Contenedor principal del sidebar
        <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>
            
            {/* Link hacia el dashboard */}
            <NavLink 
                end={true} // Asegura que se active solo en "/admin", no en subrutas
                to='/admin' 
                className={({ isActive }) => 
                    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer 
                    ${isActive && "bg-primary/10 border-r-4 border-primary"}`
                }
            >
                <img src={assets.home_icon} alt="Inicio" className='min-w-4 w-5' />
                <p className='hidden md:inline-block'>Dashboard</p>
            </NavLink>

            {/* Link hacia añadir blog */}
            <NavLink 
                to='/admin/addBlog' 
                className={({ isActive }) => 
                    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer 
                    ${isActive && "bg-primary/10 border-r-4 border-primary"}`
                }
            >
                <img src={assets.add_icon} alt="Añadir" className='min-w-4 w-5' />
                <p className='hidden md:inline-block'>Añadir Blog</p>
            </NavLink>

            {/* Link hacia listar blogs */}
            <NavLink 
                to='/admin/listBlog' 
                className={({ isActive }) => 
                    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer 
                    ${isActive && "bg-primary/10 border-r-4 border-primary"}`
                }
            >
                <img src={assets.list_icon} alt="Listar" className='min-w-4 w-5' />
                <p className='hidden md:inline-block'>Listar Blogs</p>
            </NavLink>

            {/* Link hacia los comentarios */}
            <NavLink 
                to='/admin/comments' 
                className={({ isActive }) => 
                    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer 
                    ${isActive && "bg-primary/10 border-r-4 border-primary"}`
                }
            >
                <img src={assets.comment_icon} alt="Comentarios" className='min-w-4 w-5' />
                <p className='hidden md:inline-block'>Comentarios</p>
            </NavLink>
        </div>
    )
}

export default Sidebar
