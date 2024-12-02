import Image from 'next/image'
import React from 'react'
import { fetchData } from '../../../../../utils/api'
import initTranslations from '@/app/i18n';
import DOMPurify from 'isomorphic-dompurify';

const ProductDetails = async ({ params }) => {
    const i18nNamespaces = ["home"];
    const { locale } = params
    const { t } = await initTranslations(locale, i18nNamespaces)
    const { slug } = params


    const productResponse = await fetchData(`api/single-product/${slug}`, locale)
    const singleProduct = productResponse.data

    return (
        <section>
            <div className='relative w-full h-[55vh] lg:h-[70vh] '>
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
            <div className=' px-5  lg:px-10 py-20 block lg:flex justify-between gap-20 '>
                <div className=' w-full lg:w-[50%]  text-center lg:text-start'>
                    <img className='w-full h-full' alt='img' src={singleProduct.photo} />
                </div>

                <div className='w-full h-[80%] lg:w-[50%] '>
                    <h1 className='text-4xl font-semibold py-5'>{t(singleProduct.title)}</h1>
                    <div className=" text-slate-700 text-lg leading-8 " dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize((t(singleProduct.details))) }} />

                    <div className="text-slate-700 text-lg leading-8 " dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize((t(singleProduct.details)), {
                            ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'li', 'ol', 'span'],
                            ALLOWED_ATTR: ['href', 'target', 'style']
                        })
                    }} />   
                    
                                 </div>

            </div>
        </section>
    )
}

export default ProductDetails