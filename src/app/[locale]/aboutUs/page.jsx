import initTranslations from '../../../app/i18n'
import Partner from '@/components/Partner'
import Image from 'next/image'
import React from 'react'
import { fetchData } from '../../../../utils/api'
import DOMPurify from 'isomorphic-dompurify'



export async function generateMetadata({ params }) {
    const { locale } = params

    return {
        title: locale === 'ar' ? 'معلومات عن | EMOCO' : locale === 'en' ? "Information about  | EMOCO" : locale === 'fr' ? "Information about  | EMOCO":'',
        description:  locale === 'ar' ? 'معلومات عن | EMOCO' : locale === 'en' ? "Information about  | EMOCO" : locale === 'fr' ? "Information about  | EMOCO":'',
        other: {
            title: locale === 'ar' ? 'معلومات عن | EMOCO' : locale === 'en' ? "Information about  | EMOCO" : locale === 'fr' ? "Information about  | EMOCO":'',
        }

    }
}

const AboutUs = async ({ params }) => {

    const i18nNamespaces = ["home"];
    const { locale } = params

    const { t } = await initTranslations(locale, i18nNamespaces)


    const videoData = await fetchData(`api/about-us`,locale)
    // console.log('videoData::::',videoData?.data)
     const data =  videoData?.data


     const partner = await fetchData('api/partners', locale)
     const partnerData =partner?.data





    return (
        <section className='h-full   w-full'>
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


            <div className='block lg:flex justify-between lg:gap-20 px-5 lg:px-28 py-20'>
                <img alt='img' width={500} height={600} className=' bg_img w-full h-full' src={`${data.photo}`} />
                <div className='text-center lg:text-start'>
                    <h2 className='text-[3.5rem] font-bold  uppercase  mt-5 lg:mt-0'>
                        {t(data.title)}
                    </h2>
                    <div className='text-gray-600 text-lg py-10 leading-10' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(t(data.details)) }}/>
                    {/* <p >{t(data.details)}</p> */}
                </div>
            </div>

            <div className='px-20 pb-16'>
                <Partner params={params} partnerData={partnerData} />
            </div>
        </section>
    )
}

export default AboutUs