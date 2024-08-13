import Image from 'next/image'
import React from 'react'

const Senegal = () => {
  return (
    <section className='h-full   w-full'>
    <div className='relative w-full h-[55vh] lg:h-[60vh] '>
      <Image
        src='/assets/web2.jpg'
        alt='img'
        layout='fill'
        objectFit='cover'
        quality={100}
        className='w-full h-full'
        sizes="(max-width: 600px) 150vw,
             (max-width: 1200px) 50vw,
             "
      />
      <h1 className='absolute left-7 bottom-20 lg:bottom-32 lg:start-96 text-3xl lg:text-5xl text-white font-semibold'>
        {("Emoco Senegal")}
      </h1>
    </div>

    <div className='py-14 text-center '>
      <h1 className='text-4xl font-semibold'>About Emoco Senegal</h1>
      <div className='py-12 text-3xl'>Coming Soon</div>
    </div>
  </section> )
}

export default Senegal