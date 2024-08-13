import initTranslations from '../../../app/i18n'
import Partner from '@/components/Partner'
import Image from 'next/image'
import React from 'react'
import { fetchData } from '../../../../utils/api'



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
                    {t("About Us")}
                </h1>
            </div>


            <div className='block lg:flex justify-between lg:gap-20 px-5 lg:px-28 py-20'>
                <img alt='img' width={500} height={600} className=' bg_img w-full h-full' src={`${data.photo}`} />
                <div className='text-center lg:text-start'>
                    <h2 className='text-4xl font-bold   mt-5 lg:mt-0'>
                        {t(data.title)}
                    </h2>
                    <p className='text-gray-600 py-10'>{t(data.details)}</p>
                </div>
            </div>

            <div className='px-20 pb-16'>
                <Partner params={params} />
            </div>
        </section>
    )
}

export default AboutUs