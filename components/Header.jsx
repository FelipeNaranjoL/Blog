// importaciones necesarias
import { assets } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

// estructura del header
const Header = () => {
    return (
        <div className='py-5 px-5 md:px-12 lg:px-28'>
            <div className='flex justify-between items-center '>
                {/* Logo del blog */}
                <Image src={assets.logo} alt="" width={180} className='w-[130px] sm:w-auto' />
                {/* Boton en la parte de la derecha */}
                <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">Empecemos <Image src={assets.arrow} alt='' />
                </button>
            </div>
            {/* Parte central del blog */}
            <div className='text-center my-8'>
                <h1 className='text-3xl sm:text5xl font-medium'>Ultimas entradas</h1>
                <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum quo architecto, voluptates labore a vel.
                </p>
                {/* formulario de suscripcion */}
                <form className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]' action="">
                    <input type="email" placeholder='Ingrese su correo' className='pl-4 outline-none' />
                    <button type='submit' className='border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white'>Escribirse</button>
                </form>
            </div>
        </div>
    )
};

export default Header