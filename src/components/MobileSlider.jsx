'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import 'swiper/css/navigation'
import "swiper/css/pagination";
import 'swiper/css/autoplay'
import { useTranslation } from 'react-i18next';
import { fetchData } from '../../utils/api';



const MobileSlider = () => {
const {t ,i18n}=useTranslation()

const [slider ,setSider]=useState([])

    useEffect(()=>{

const fetchedData =async()=>{
            const data =await fetchData('api/sliders',i18n.language)
            const  slides =data?.data
            setSider(slides)
       
}

fetchedData()

    },[i18n.language])

    return (
        <Swiper
          className='overflow-hidden'
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          speed={2500}
          autoplay={{ delay: 0 }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 100,
            },
          }}
    
        >
          {slider.map((partner, index) => (
            <SwiperSlide key={index}>
              <img width={400} height={300} className='object-cover mobile-img' src={`${partner.photo}`} alt={`Partner ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
  )
}

export default MobileSlider