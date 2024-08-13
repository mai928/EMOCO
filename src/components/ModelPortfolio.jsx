'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { fetchData } from '../../utils/api';
import { useTranslation } from 'react-i18next';
import { icons } from '@/data/data';

const ModelPortfolio = ({ Modelsdata }) => {

    const { t, i18n } = useTranslation()
    const [ModelById, setModelById] = useState([])
    // console.log('Modelsdata::', Modelsdata)

    const [activeIndex, setActiveIndex] = useState(2);

    const handleCatagory = (id) => {
        setActiveIndex(id)
    }

    useEffect(() => {
        const fetchDataFromAPI = async () => {
            try {
                const response = await fetch(`http://admin.emocoegypt.com/admin/public/api/models/${activeIndex}`, {
                    headers: { 'Accept-Language': i18n.language ,
                        "Cookie": "laravel_session=PGsgd3jR1M5Ss3kBJytnvHXHHLT3Xvk6bKKiazlD"
                    }
                });
                const models = await response.json();  // Await the JSON parsing
                setModelById(models?.data);
                console.log(models);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchDataFromAPI();
    }, [activeIndex, i18n.language]);
    


    return (
        <div className='text-center px-5 lg:px-28'>
            <p className='text-4xl font-bold pt-5 pb-10'>{t("Pool Models")}</p>


            <div className=''>
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 items-center px-4 sm:px-8 md:px-16'>
                    {Modelsdata?.map((item, index) => (
                        <div key={index} className='flex flex-col lg:flex-row items-center'
                        >
                            <div onClick={() => handleCatagory(item.id)} className={`m-auto  cursor-pointer ${activeIndex === item.id ? 'fill-black' : 'fill-slate-500'}`}>
                                <div className={`${activeIndex === item.id ? 'fill-black' : 'fill-slate-500'}`}>{icons[index].icon && icons[index].icon}</div>
                                <p className={`${activeIndex === item.id ? 'text-black font-bold text-[15px]' : 'text-slate-500 text-sm font-semibold'}`}>{t(item.title)}</p>
                            </div>

                            {/* {
                            activeIndex === item.id && <div className='py-5  block lg:hidden'>
                                {
                                    ModelById?.map((item ,index) => (
                                        <div key={index} className='text-center  m-auto'>
                                            <img className='w-[300px] lg:w-[400px] m-auto rounded-lg' alt='img' src={`${item.photo}`} />
                                            <h3 className='text-xl  font-bold  py-5'>{t(item.title)}</h3>
                                            <p className='lg:w-1/2 m-auto font-semibold text-slate-600 text-[17px]'>{t(item.details)}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        } */}

                        </div>
                    ))}



                </div>


                <div className='flex gap-10 py-16 ' >
                    {
                        ModelById?.map((item, index) => (
                            <div key={index} className='text-center  m-auto'>
                                <img className='w-[300px] lg:w-[400px] m-auto rounded-lg' alt='img' src={`${item.photo}`} />
                                <h3 className='text-xl  font-bold  py-5'>{t(item.title)}</h3>
                                <p className='lg:w-1/2 m-auto font-semibold text-slate-600 text-[17px]'>{t(item.details)}</p>
                            </div>
                        ))
                    }
                </div>
            </div>




        </div>)
}

export default ModelPortfolio

