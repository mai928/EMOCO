import initTranslations from '@/app/i18n';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { fetchData } from '../../../../utils/api';



export async function generateMetadata({ params }) {
    const { locale } = params

    return {
        title: locale === 'ar' ? 'خدمات  | EMOCO' : locale === 'en' ? "Services   | EMOCO" : locale === 'fr' ? "prestations   | EMOCO" : '',
        description: locale === 'ar' ? 'خدمات  | EMOCO' : locale === 'en' ? "Services   | EMOCO" : locale === 'fr' ? "prestations   | EMOCO" : '',
        other: {
            title: locale === 'ar' ? 'خدمات  | EMOCO' : locale === 'en' ? "Services   | EMOCO" : locale === 'fr' ? "prestations   | EMOCO" : '',
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

    const response = await fetchData('api/services', locale)
    const servesData = response.data

    return (
        <section className='h-full   w-full'>
             <div className='relative w-full h-[55vh] lg:h-[70vh] '>
                <Image
                    src='/assets/main2.webp'
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


            <h1 className='text-center text-4xl  font-semibold py-14'>
                {t("Our Services")}
            </h1>

            <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-16 px-5 lg:px-28  pb-20'>
                {
                    servesData?.map((item, index) => (
                        <div key={index} className='border-[2px] border-solid border-gray-200 rounded-lg bg-slate-100'>
                            {/* transform transition-transform duration-300 ease-out hover:scale-110 */}
                            <div className="overflow-hidden rounded-t-lg">
                                <img
                                    alt="img"
                                    className="w-[500px] h-[300px] object-cover transform transition-transform duration-300 ease-out hover:scale-110 cursor-pointer"
                                    src={item.photo}
                                />
                            </div>
                            <div className='ms-3 my-5'>
                                <h3 className='font-bold text-xl'>{t(item.title)}</h3>
                                <div className='text-[15px]  py-3 text-gray-700 font-semibold h-24 ' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(t(truncateText(item.details || '', 15))) }} />
                                <div className='  flex items-end'> <Link className=' py-3 px-4   rounded-sm bg-secondary_color hover:bg-footer_color hover:font-semibold  text-white ' href={`/services/${item.slug}`}>
                                    {/* <svg className='bg-secondary_color fill-white px-2 rounded-full ' width={40} height={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg> */}
                                    Read More
                                </Link></div>

                            </div>

                        </div>
                    ))
                }
            </div>

        </section>
    )
}

export default Services