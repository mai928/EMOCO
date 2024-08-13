import initTranslations from '@/app/i18n'
import ModelPortfolio from '@/components/ModelPortfolio'
import Image from 'next/image'
import React from 'react'
import { fetchData } from '../../../../utils/api'




// export async function generateMetadata({ params }) {
//     const { locale } = params

//     return {
//         title: locale === 'ar' ? 'المقالات | دكتور خالد النمرسي' : locale === 'en' ? "Blogs | Dr Khaled Elnomrosy" : locale === 'fr' ? 'french' : 'language',
//         description: locale === 'ar' ? 'المقالات | دكتور خالد النمرسي' : locale === 'en' ? "Blogs | Dr Khaled Elnomrosy" : locale === 'fr' ? 'french' : 'language',
//         other: {
//             title: locale === 'ar' ? 'المقالات | دكتور خالد النمرسي' : locale === 'en' ? "Blogs | Dr Khaled Elnomrosy" : locale === 'fr' ? 'french' : 'language',
//         }

//     }
// }

const OurPortfolio = async ({ params }) => {
    const i18nNamespaces = ["home"];
    const { locale } = params
    const { t } = await initTranslations(locale, i18nNamespaces)


    let data=[]
    let Modelsdata=null
    let ModelById=null
    let index =1
    try {
        const portfolioResponse = await fetchData(`api/portfolio`, locale);
         data = portfolioResponse?.data;

        // console.log(data)

        const modelsResponse = await fetchData(`api/models-category`, locale);
          Modelsdata = modelsResponse?.data;
        // console.log('Modelsdata::',Modelsdata)

       
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }


   


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
            <ModelPortfolio Modelsdata={Modelsdata} />

        </section>
    )
}

export default OurPortfolio