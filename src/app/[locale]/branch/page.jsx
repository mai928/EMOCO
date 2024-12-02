import initTranslations from '@/app/i18n'
import Image from 'next/image'
import React from 'react'
import { fetchData } from '../../../../utils/api';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';

const Branch = async ({ params }) => {
  const i18nNamespaces = ["home"];
  const { locale } = params
  const { t } = await initTranslations(locale, i18nNamespaces)
  const aboutSingal = await fetchData(`api/about-singal`, locale)
  const branchData = aboutSingal.data


  const productResponse = await fetchData(`api/products`, locale)
  const products = productResponse.data



  const truncateText = (text, wordCount) => {
      return text?.split(' ').slice(0, wordCount).join(' ') + '...';
  };

  const response = await fetchData('api/services', locale)
  const servesData = response.data
  return (
    <section className='h-full  w-full'>
      <div className='relative w-full h-[55vh] lg:h-[75vh] '>
        <Image
          src='/assets/sengal2.webp'
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
      <Image width={140} height={140} loading='lazy' className={`w-56 m-auto pb-10`} src={`/assets/sengal-remove.png`} alt='Logo' />

        {/* <h1 className=' text-2xl lg:text-4xl font-semibold py-5'>{t("Emoco Sénégal")}</h1> */}
        <p className=' text-xl leading-10  pb-10 text-slate-600 lg:w-[80%] m-auto'>Basé sur la vision du Conseil d’Administration et l’aspiration continue d’expansion et d’investissement dans notre cher continent, en particulier le pays frère du Sénégal.
          Le directeur général du groupe EMOCO, l'ingénieur Mohab Mamdouh Elsaeed, a décidé d'ouvrir la succursale du Sénégal pour transférer notre riche expérience et accroître la sophistication et la croissance sur notre continent bien-aimé.</p>
        <div className=' block lg:flex gap-20 '>
          {/* <div className='lg:w-[50%]'>
            <img className='w-full h-full' src={branchData?.photo} />

          </div> */}

          <div className='text-center m-auto lg:w-[100%] border-[1px] p-5 border-gray-100 rounded-sm shadow-sm'>
            <p className='text-3xl font-bold pb-5'>nos prestations  </p>
            {
              branchData?.details?.map((item, index) => (
                <p key={index} className='text-white bg-secondary_color py-2 mb-5 text-xl lg:px-10'>{item}</p>

              ))
            }
          </div>
        </div>

        <div>
        <h1 className='text-center text-3xl  font-semibold pb-5  pt-20'>
                {t("nos produits")}
            </h1>

            <div className='text-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-16   pb-20'>
                {
                    products?.map((item, index) => (
                        <div key={index} className='border-[2px] border-solid border-gray-100 rounded-lg bg-gray-50 shadow-md'>
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
                                <div className='  flex items-end'> <Link className=' py-3 px-4   rounded-md hover:bg-secondary_color bg-footer_color hover:font-semibold  text-white ' href={`/branch/${item.slug}`}>
                                    {/* <svg className='bg-secondary_color fill-white px-2 rounded-full ' width={40} height={40} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg> */}
                                    {t("En savoir plus")}
                                </Link></div>

                            </div>

                        </div>
                    ))
                }
            </div>
        </div>

        <div className='pb-10 '>
          <div><iframe loading='lazy' className='w-[100%] h-[600px] m-auto'
            src={branchData?.map}
          >

          </iframe></div>
        </div>
      </div>
    </section>


  )
}

export default Branch