import initTranslations from '@/app/i18n';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { fetchData } from '../../../../utils/api';



export async function generateMetadata({ params }) {
    const { locale } = params

    return {
        title: locale === 'ar' ? 'خدمات  | EMOCO' : locale === 'en' ? "Services   | EMOCO" : locale === 'fr' ? "prestations   | EMOCO":'',
        description:  locale === 'ar' ? 'خدمات  | EMOCO' : locale === 'en' ? "Services   | EMOCO" : locale === 'fr' ? "prestations   | EMOCO":'',
        other: {
            title: locale === 'ar' ? 'خدمات  | EMOCO' : locale === 'en' ? "Services   | EMOCO" : locale === 'fr' ? "prestations   | EMOCO":'',
        }

    }
}

const Services = async ({ params }) => {
    const i18nNamespaces = ["home"];
    const { locale } = params
    const { t } = await initTranslations(locale, i18nNamespaces)

    const truncateText = (text, wordCount) => {
        return text?.split(' ').slice(0, wordCount).join(' ') + '...';
    };

       const response= await fetchData('api/services',locale)
        const servesData=  response.data

    return (
        <section className='h-full   w-full'>
            <div className='relative w-full h-[55vh] lg:h-[60vh] '>
                <Image
                    src='/assets/pool.jpeg'
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
                    {t("Our Services")}
                </h1>
            </div>


            <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-16 px-10 lg:px-28 py-20'>
                {
                    servesData?.map((item, index) => (
                        <div key={index} className='border-[2px] border-solid border-gray-200 rounded-lg bg-slate-100'>
                            <img  alt='img' className=' h-[300px] object-cover rounded-t-lg' src={item.photo} />
                            <div className='ms-3 my-5'>
                                <h3 className='font-bold'>{t(item.title)}</h3>
                                {/* <p className='text-[15px]  py-3 text-gray-700 font-semibold'>{t(item.desc)}</p> */}
                                <div className='text-[15px]  py-3 text-gray-700 font-semibold' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(t(truncateText(item.details || '', 20))) }} />
                                <Link className='flex justify-center' href={`/services/${item.slug}`}>
                                    <svg className='bg-secondary_color fill-white px-2 rounded-full ' width={40} height={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg>
                                </Link>
                            </div>

                        </div>
                    ))
                }
            </div>

        </section>
    )
}

export default Services