// importaciones necesarias
import { blog_data } from '@/assets/assets'
import React, { useState } from 'react'
import BlogItem from './BlogItem'

// estructura del BlogList
const BlogList = () => {
    const [menu,setMenu] = useState("Todo")
  return (
    <div>
        {/* cabecera de los tipos de categoria */}
        <div className='flex justify-center gap-6 my-10'>
            <button onClick={()=> setMenu("Todo")} className={menu==="Todo"?'bg-black text-white py-1 px-4 rounded-sm':""}>Todo</button>
            <button onClick={()=> setMenu("Lifestyle")}className={menu==="Lifestyle"?'bg-black text-white py-1 px-4 rounded-sm':""}>Lifestyle</button>
            <button onClick={()=> setMenu("Startup")}className={menu==="Startup"?'bg-black text-white py-1 px-4 rounded-sm':""}>Startup</button>
            <button onClick={()=> setMenu("Technology")}className={menu==="Technology"?'bg-black text-white py-1 px-4 rounded-sm':""}>Technology</button>
        </div>
        {/* recorrido de los componentes de assets, importando ya la estructura generada en BlogItem */}
        {/* Renderiza una lista de componentes BlogItem dentro de un contenedor responsivo con TailwindCSS.
        Filtra blog_data según la categoría seleccionada en menu (o muestra todos si es "Todo").
        Cada elemento filtrado se mapea a un BlogItem con sus propiedades (image, title, description, category). */}
        <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
            {blog_data.filter((item)=> menu==="Todo"?true:item.category===menu).map((item, index) =>{
                return <BlogItem key={index} id={item.id} image={item.image} title={item.title} description={item.description} category={item.category}/>
            })}
        </div>
    </div>
  )
}

export default BlogList