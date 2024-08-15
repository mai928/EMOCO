import initTranslations from '@/app/i18n';
import React from 'react'
import { fetchData } from '../../../../../utils/api';
import Image from 'next/image';

const ModelDetails = async({params}) => {
    const i18nNamespaces = ["home"];
    const { locale } = params
    const { t } = await initTranslations(locale, i18nNamespaces)
  
    const slug = params?.slug
    console.log(slug)
  
    const res = await fetchData(`api/single-model/${slug}`,locale)
    const ModelDetails = res?.data
    // console.log('ModelDetails:::',ModelDetails)
  
  
  return (
    <section>
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
        {t("Model Details")}
      </h1>
    </div>
    <div className='p-20 block lg:flex justify-between gap-20 '>
    <div className=' w-full lg:w-[50%]  text-center lg:text-start'>
    <img className='w-full h-full' alt='img' src={ModelDetails.photo} />
      </div>

      <div className='w-full h-[80%] lg:w-[50%] '>
      <h1 className='text-3xl font-semibold py-3'>{ModelDetails.title}</h1>
        <p className='text-slate-700 text-[15px] leading-8 font-semibold'>{ModelDetails.details}</p>
      </div>

    </div>
  </section>
  )
}

export default ModelDetails