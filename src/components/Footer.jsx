import React from 'react'
import { fetchData } from '../../utils/api';
import initTranslations from '@/app/i18n';

const Footer =async ({params}) => {

    const i18nNamespaces = ["home"];
    const { locale } = params

    const { t } = await initTranslations(locale, i18nNamespaces)


    const footer = await fetchData(`api/settings`,locale)
     const data =  footer?.data



    return (
        <section className='absolute bottom-0 right-0 left-0 w-full'>
            <div className='z-10 bg-opacity-50 bg-black py-2  text-center'>
                <p className='text-white'>{t(data.footer)}</p>
            </div>
        </section>

    )
}

export default Footer





