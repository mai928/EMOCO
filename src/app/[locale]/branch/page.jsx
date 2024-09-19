import initTranslations from '@/app/i18n'
import Image from 'next/image'
import React from 'react'

const Branch = async ({ params }) => {
  const i18nNamespaces = ["home"];
  const { locale } = params
  const { t } = await initTranslations(locale, i18nNamespaces)
  return (
    <section className='h-full  w-full'>
      <div className='relative w-full h-[55vh] lg:h-[80vh] '>
        <Image
          src='/assets/Scope1.jpg'
          alt='img'
          layout='fill'
          objectFit='cover'
          quality={100}
          className='w-full h-full'
          sizes="(max-width: 600px) 150vw,
               (max-width: 1200px) 50vw,
               "
        />
        <div className='absolute inset-0 bg-black opacity-20' />
      </div>

      <div className='py-14 text-center  px-5 lg:px-16'>
        <h1 className=' text-2xl lg:text-4xl font-semibold py-10'>{t("Services Emoco Senegal")}</h1>
        <div className=' block lg:flex gap-20 '>
          <div className='lg:w-[50%]'>
            <img src='/assets/branchSengal.jpg' />

          </div>

          <div className='text-start lg:w-[50%]'>
            <p className='text-white bg-secondary_color py-2 my-5 text-xl px-10'>Entretien général</p>
            <p className='text-white bg-secondary_color py-2 my-5 text-xl px-10'> Fournitures et installation  <span>            (équipements -Produits chimiques - Plomberie)
            </span></p>
            <p className='text-white bg-secondary_color py-2 my-5 text-xl px-10'>  Conception et ingénierie</p>
            <p className='text-white bg-secondary_color py-2 my-5 text-xl px-10'>Traitement de l'eau</p>
          </div>
        </div>

        <div className='py-10'>
          <div><iframe loading='lazy' className='w-[100%] h-[600px] m-auto'
            src='https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3863.5880138762595!2d-16.984910924896663!3d14.450890486017895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTTCsDI3JzAzLjIiTiAxNsKwNTgnNTYuNCJX!5e0!3m2!1sen!2seg!4v1726669789059!5m2!1sen!2seg'
          >

          </iframe></div>
        </div>
      </div>
    </section>


  )
}

export default Branch