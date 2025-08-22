// importaciones necesarias
import React from 'react'
import Image from 'next/image';
import { assets } from '@/assets/assets';

// estructura del Footer
const Footer = () => {
  return (
    <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center'>ç
        {/* logo del blog */}
        <Image src={assets.logo_light} alt='' width={120}/>
        <p className='text-sm text-white'>Derechos reservados a Felipe Naranjo</p>
        <div className='flex'>
          {/* imagenes de redes sociales */}
            <Image src={assets.facebook_icon} alt='' width={40}/>
            <Image src={assets.twitter_icon} alt='' width={40}/>
            <Image src={assets.github_icon} alt='' width={40}/>
        </div>
    </div>
  )
}

export default Footer