// importaciones necesarias
'use client'
import { assets, blog_data } from '@/assets/assets'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Footer from '@/components/Footer';
import Link from 'next/link';

// este bloque espera de manera dinamica un "/blogs/x" siendo la x un id de los articulos del blog, se declara data, setData para ir actualizandolo dependiendo del id y del contenido que contiene
// la funcion fetchBlogData recorre blog_data con el fin de encontrar el id ingresado en la url, una vez encontrado, actualiza la variable data con los datos del id correspondiente,
// los despliega en la pagina y corta para no seguir buscando innecesariamente
const page = ({ params }) => {
    const [data, setData] = useState(null)
    const fetchBlogData = () => {
        for (let i = 0; i < blog_data.length; i++) {
            if (Number(params.id) === blog_data[i].id) {
                setData(blog_data[i]);
                // console.log(blog_data[i]);
                break;
            }
        }
    }

// Cuando el componente se monte por primera vez (al cargar la página), ejecuta fetchBlogData().
// El [] vacío en las dependencias asegura que solo se ejecute una vez (comportamiento tipo componentDidMount en React clásico).
// Esa función se encarga de buscar el post correcto en blog_data y guardarlo en data.

    useEffect(() => {
        fetchBlogData();
    }, [])

// Si data existe (ya se encontró el blog con el id correcto), se renderiza todo el contenido del artículo.
// Si no, no se muestra nada (retorna un fragmento vacío).
    return (data ? <>
        <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
            {/* Header */}
            <div className='flex justify-between items-center'>
                <Link href='/'>
                <Image src={assets.logo} width={180} alt='' className='w-[130px] sm:w-auto' />
                </Link>
                <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>
                    Empecemos <Image src={assets.arrow} alt='' />
                </button>
            </div>
            {/* contenedor del titulo, autor e imagen del mismo */}
            <div className='text-center my-24'>
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
                <Image className='mx-auto mt-6 border border-white rounded-full' src={data.author_img} width={60} height={60} alt='' />
                <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
            </div>
            {/* contenedor del imagen del post y descripcion */}
            <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
                <Image className='border-4 border-white' src={data.image} width={1280} height={720} alt='' />
                <h1 className='my-8 text-[26px] font-semibold'>Introducción:</h1>
                <p>{data.description}</p>
                <h3 className='my-5 text-[18px] font-semibold'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum, ab?</h3>
                <p className='my-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam distinctio corporis doloremque in accusamus iusto?</p>
                <h3 className='my-5 text-[18px] font-semibold'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum, ab?</h3>
                <p className='my-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam distinctio corporis doloremque in accusamus iusto?</p>
                <h3 className='my-5 text-[18px] font-semibold'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum, ab?</h3>
                <p className='my-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam distinctio corporis doloremque in accusamus iusto?</p>
                {/* contenedor de redes sociales */}
                <div className='my-24'>
                    <p className='text-black font font-semibold my-4'>Comparte este articulos en tus redes sociales</p>
                    <div className='flex'>
                        <Image src={assets.facebook_icon} alt='' width={50} />
                        <Image src={assets.twitter_icon} alt='' width={50} />
                        <Image src={assets.github_icon} alt='' width={50} />
                    </div>
                </div>
            </div>
        </div>
        {/* Exportamos footer */}
        <Footer/>
    </> : <></>
    )
}

export default page