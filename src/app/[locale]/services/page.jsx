import initTranslations from '@/app/i18n';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { fetchData } from '../../../../utils/api';




// export async function generateMetadata({ params }) {
//     const { locale } = params
//     const response= await fetchData('api/services',locale)
//     const servesData=  response.data

//     return {
//         title: locale === 'ar' ? 'المقالات | دكتور خالد النمرسي' : locale === 'en' ? "Blogs | Dr Khaled Elnomrosy" : locale === 'fr' ? 'french' : 'language',
//         description: locale === 'ar' ? 'المقالات | دكتور خالد النمرسي' : locale === 'en' ? "Blogs | Dr Khaled Elnomrosy" : locale === 'fr' ? 'french' : 'language',
//         other: {
//             title: locale === 'ar' ? 'المقالات | دكتور خالد النمرسي' : locale === 'en' ? "Blogs | Dr Khaled Elnomrosy" : locale === 'fr' ? 'french' : 'language',
//         }

//     }
// }

const Services = async ({ params }) => {
    const i18nNamespaces = ["home"];
    const { locale } = params
    const { t } = await initTranslations(locale, i18nNamespaces)

    const truncateText = (text, wordCount) => {
        return text?.split(' ').slice(0, wordCount).join(' ') + '...';
    };

       const response= await fetchData('api/services',locale)
        const servesData=  response.data
        // console.log("servesData::::",servesData)

    // const servesData = [
    //     {
    //         id: 1,
    //         slug: 'SWIMMING POOLS',
    //         src: '/assets/service1.jpg',
    //         title: "Test-Bottle1",
    //         desc: "Medical is the knowledge or master event. Identify the error of the we coding page speed.",
    //     },
    //     {
    //         id: 2,
    //         slug: 'PROCURMENT & SUPPLY',
    //         src: '/assets/service1.jpg',
    //         title: "Test-Bottle2",
    //         desc: "Medical is the knowledge or master event. Identify the error of the we coding page speed.",
    //     },
    //     {
    //         id: 3,
    //         slug: 'HEALTH CLUBS EQUIPMENT',
    //         src: '/assets/service1.jpg',
    //         title: "Test-Bottle3",
    //         desc: "Medical is the knowledge or master event. Identify the error of the we coding page speed.",
    //     },
    //     {
    //         id: 4,
    //         slug: 'PLUMBING STATIONS',
    //         src: '/assets/service1.jpg',
    //         title: "Test-Bottle4",
    //         desc: "Medical is the knowledge or master event. Identify the error of the we coding page speed.",
    //     },
    //     ,
    //     {
    //         id: 5,
    //         slug: 'FIRE FIGHTING SYSTEMS',
    //         src: '/assets/service1.jpg',
    //         title: "Test-Bottle5",
    //         desc: "Medical is the knowledge or master event. Identify the error of the we coding page speed.",
    //     },
    //     ,
    //     {
    //         id: 6,
    //         slug: 'MAINTENANCE & OPERATION',
    //         src: '/assets/service1.jpg',
    //         title: "Test-Bottle6",
    //         desc: "Medical is the knowledge or master event. Identify the error of the we coding page speed.",
    //     },
    //     {
    //         id: 7,
    //         slug: 'WATER FEATURE INSTRUCTION',
    //         src: '/assets/service1.jpg',
    //         title: "Test-Bottle7",
    //         desc: "Medical is the knowledge or master event. Identify the error of the we coding page speed.",
    //     },
    // ];

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
                    {t("Our Services")}
                </h1>
            </div>


            <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-16 px-10 lg:px-28 py-20'>
                {
                    servesData?.map((item, index) => (
                        <div key={index} className='border-[2px] border-solid border-gray-200 rounded-lg bg-slate-100'>
                            <img width={500} height={500} alt='img' className=' rounded-t-lg' src={item.photo} />
                            <div className='ms-3 my-5'>
                                <h3 className='font-bold'>{t(item.title)}</h3>
                                {/* <p className='text-[15px]  py-3 text-gray-700 font-semibold'>{t(item.desc)}</p> */}
                                <div className='text-[15px]  py-3 text-gray-700 font-semibold' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(t(truncateText(item.details, 20))) }} />
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