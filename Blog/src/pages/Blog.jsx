/**
 * ==========================================================
 * Componente: Blog.tsx
 * Descripción: 
 * - Página de detalle de un post del blog.
 * - Muestra título, subtítulo, autor, imagen, contenido y comentarios.
 * - Permite agregar comentarios y compartir en redes sociales.
 * ==========================================================
 */

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom' // Para capturar el parámetro dinámico :id de la URL
import { assets, blog_data, comments_data } from '../assets/assets' // Recursos y datos de prueba
import Navbar from '../components/Navbar' // Barra de navegación
import Footer from '../components/Footer' // Footer del sitio
import Loading from '../components/Loading' // Componente de spinner mientras carga la data
import moment from 'moment' // Librería para formatear fechas
import { useAppContext } from '../context/AppContext' // Contexto global (ej: axios, estado)
import toast from 'react-hot-toast' // Notificaciones tipo toast

const Blog = () => {
    // 📌 Obtenemos el ID del blog desde la URL
    const { id } = useParams() 

    // 📌 Extraemos axios del contexto para hacer peticiones HTTP
    const { axios } = useAppContext();

    // 📌 Estado para la información del blog
    const [data, setData] = useState(null)

    // 📌 Estado para los comentarios
    const [comments, setComments] = useState([])
    const [name, setName] = useState('')       // Nombre del nuevo comentario
    const [content, setContent] = useState('') // Contenido del nuevo comentario

    // 📌 Función para obtener los datos del blog desde el backend
    const fetchBlogData = async () => {
        try {
            const { data } = await axios.get(`/api/blog/${id}`) 
            data.success ? setData(data.blog) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    // 📌 Función para obtener los comentarios del blog
    const fetchComments = async () => {
        try {
            const { data } = await axios.post('/api/blog/comments', { blogId: id })
            if (data.success) {
                setComments(data.comments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // 📌 Función para agregar un comentario nuevo
    const addComment = async (e) => {
        e.preventDefault() // Evita que se recargue la página al enviar
        try {
            const { data } = await axios.post('/api/blog/add-comment', { blog: id, name, content });
            if (data.success) {
                toast.success(data.message)
                setName('')       // Limpia el input de nombre
                setContent('')    // Limpia el textarea de contenido
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // 📌 useEffect para cargar los datos del blog y sus comentarios al montar el componente
    useEffect(() => {
        fetchBlogData()
        fetchComments()
    }, [])

    // 📌 Renderizado condicional: si data existe, mostramos el blog; sino mostramos Loading
    return data ? (
        <div className='relative'>
            {/* Fondo decorativo */}
            <img src={assets.gradientBackground} className='absolute -top-50 -z-1 opacity-50' alt="" />

            {/* Navbar */}
            <Navbar />

            {/* Encabezado del blog */}
            <div className='text-center mt-20 text-gray-600'>
                {/* Fecha de publicación */}
                <p className='text-primary py-4 font-medium'>
                    Publicado el {moment(data.createdAt).format('D/MM/YYYY')}
                </p>

                {/* Título y subtítulo */}
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>
                    {data.title}
                </h1>
                <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>

                {/* Autor */}
                <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>
                    Felipe Naranjo
                </p>
            </div>

            {/* Contenido principal */}
            <div className='mx-5 max-w-5xl md:mx-auto py-10 mt-6'>
                {/* Imagen del blog */}
                <img src={data.image} className='rounded-3xl mb-5' alt="" />

                {/* Contenido HTML del blog */}
                <div className='rich-text max-w-3xl mx-auto'
                    dangerouslySetInnerHTML={{ __html: data.description }}>
                </div>

                {/* --------------------- Sección de Comentarios --------------------- */}
                <div className='mt-14 mb-10 max-w-3xl mx-auto'>
                    <p className='font-semibold mb-4'>Comentarios ({comments.length})</p>

                    <div className='flex flex-col gap-4'>
                        {comments.map((item, index) => (
                            <div key={index} className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600'>
                                <div className='flex items-center gap-2 mb-2'>
                                    <img src={assets.user_icon} className='w-6' alt="" />
                                    <p className='font-medium'>{item.name}</p>
                                </div>
                                <p className='text-sm max-w-md ml-8'>{item.content}</p>

                                {/* Fecha del comentario */}
                                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>
                                    {moment(data.createdAt).format('D/MM/YYYY')}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --------------------- Añadir comentario --------------------- */}
                <div className='max-w-3xl mx-auto'>
                    <p className='font-semibold mb-4'>Añadir comentario</p>
                    <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
                        {/* Input de nombre */}
                        <input
                            type="text"
                            placeholder='Nombre'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className='w-full p-2 border border-gray-300 rounded outline-none'
                        />

                        {/* Textarea de comentario */}
                        <textarea
                            placeholder='Comenta'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className='w-full p-2 border border-gray-300 rounded outline-none h-48'
                        />

                        {/* Botón de enviar */}
                        <button type="submit" className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>
                            Enviar
                        </button>
                    </form>
                </div>

                {/* --------------------- Compartir en Redes Sociales --------------------- */}
                <div className='my-24 max-w-3xl mx-auto'>
                    <p className='font-semibold my-4'>Comparte este artículo por tus redes sociales</p>
                    <div className='flex gap-4'>
                        <img src={assets.facebook_icon} width={50} alt="Facebook" />
                        <img src={assets.twitter_icon} width={50} alt="Twitter" />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    ) : <Loading /> // Muestra spinner mientras se cargan los datos del blog
}

export default Blog
