'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay ,EffectFade } from "swiper/modules";
import "swiper/css";
import 'swiper/css/navigation'
import "swiper/css/pagination";
import 'swiper/css/autoplay'
import "swiper/css/effect-fade";

import { useTranslation } from 'react-i18next';
import { fetchData } from '../../utils/api';



const MobileSlider = () => {
  const { t, i18n } = useTranslation()

  const [slider, setSider] = useState([])

  useEffect(() => {

    const fetchedData = async () => {
      const data = await fetchData('api/sliders', i18n.language)
      const slides = data?.data
      setSider(slides)

    }

    fetchedData()

  }, [i18n.language])

  console.log(slider)



  return (
    <section className='w-full h-screen z-0 relative overflow-hidden'>
      <Swiper
        className='overflow-hidden'
        modules={[Autoplay ,EffectFade]}
        slidesPerView={1}
        loop={true}
        speed={4000}
        autoplay={{ delay: 1000 }}
        effect='fade'
        fadeEffect={{ crossFade: true }} // Enable cross-fade for smoother transitions



      >
        {slider?.slice().reverse().map((partner, index) => (
          <SwiperSlide key={index}>
            <img className='w-full h-full mobile-img' src={`${partner.photo}`} alt={`Partner ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>

  )
}

export default MobileSlider