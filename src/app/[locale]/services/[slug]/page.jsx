import initTranslations from '@/app/i18n'
import Image from 'next/image'
import React from 'react'
import { fetchData } from '../../../../../utils/api'




export async function generateMetadata({ params }) {
  const { locale } = params
  const response = await fetchData('api/services', locale)
  const servesData = response.data


  return {
    title: servesData.meta_title,
    description: servesData.meta_title,
    other: {
      title: servesData.meta_details,
    }

  }
}

const ServiceDetails = async ({ params }) => {
  const i18nNamespaces = ["home"];
  const { locale } = params
  const { t } = await initTranslations(locale, i18nNamespaces)

  const slug = params?.slug
  // console.log(slug)

  const res = await fetchData(`api/single-service/${slug}`, locale)
  const ServiceDetails = res?.data



  return (
    <section>
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
                <div className='absolute inset-0 bg-black opacity-20'/>
               </div>
      <div className=' px-5  lg:px-10 py-20 block lg:flex justify-between gap-20 '>
        <div className=' w-full lg:w-[50%]  text-center lg:text-start'>
          <img className='w-full h-full' alt='img' src={ServiceDetails.photo} />
        </div>

        <div className='w-full h-[80%] lg:w-[50%] '>
          <h1 className='text-4xl font-semibold py-5'>{ServiceDetails.title}</h1>
          <p className='text-slate-700 text-lg leading-8 font-semibold'>{ServiceDetails.details}</p>
        </div>

      </div>
    </section>
  )
}

export default ServiceDetails