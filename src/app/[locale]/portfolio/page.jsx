'use client'
import initTranslations from '@/app/i18n'
import ModelPortfolio from '@/components/ModelPortfolio'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { fetchData } from '../../../../utils/api'
import { useTranslation } from 'react-i18next'



// export async function generateMetadata({ params }) {
//     const { locale } = params

//     return {
//         title: locale === 'ar' ? 'بورتفوليو عن | EMOCO' : locale === 'en' ? "Portfolio about  | EMOCO" : locale === 'fr' ? "Portefeuille à propos  | EMOCO":'',
//         description:  locale === 'ar' ? 'بورتفوليو عن | EMOCO' : locale === 'en' ? "Portfolio about  | EMOCO" : locale === 'fr' ? "Portefeuille à propos  | EMOCO":'',
//         other: {
//             title: locale === 'ar' ? 'بورتفوليو عن | EMOCO' : locale === 'en' ? "Portfolio about  | EMOCO" : locale === 'fr' ? "Portefeuille à propos  | EMOCO":'',
//         }

//     }
// }

const OurPortfolio = () => {
    const { t, i18n } = useTranslation()
    const [data, setData] = useState([])


    useEffect(() => {

        const fetchDataFromAPI = async () => {
            try {


                const portfolioResponse = await fetchData(`api/portfolio`, i18n.language);
                setData(portfolioResponse?.data)

            } catch (error) {
                console.error("Error fetching data:", error);
            }


        }

        fetchDataFromAPI()
    }, [])






    return (
        <section className='h-full relative  w-full'>
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
                    {t("Our Portfolio")}
                </h1>
            </div>


            <div className='block lg:flex justify-between gap-20 px-5 lg:px-28 py-20'>
                <img width={500} height={600} className='bg_img' alt='img' src={`${data.photo}`} />
                <div>
                    <h2 className='text-4xl font-bold  '>
                        {t(data.title)}
                    </h2>
                    <p className='text-gray-600 py-10'>{t(data.details)}</p>
                </div>
            </div>
            <ModelPortfolio />

        </section>
    )
}

export default OurPortfolio