'use client'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import 'swiper/css/navigation'
import "swiper/css/pagination";
import 'swiper/css/autoplay'



const Partner = ({ partnerData }) => {

  // const { locale } = params

  // const  [partners ,setPartner]=useState([])

  // useEffect(() => {
  //   const sliderLogos = async () => {
  //     const data = await fetchData('api/partners', locale)
  //          setPartner(data?.data)
  //   }

  //   sliderLogos()

  // }, [])

  //  console.log( 'partners:::',partners)

  const breakpoints = {
    1024: {
      slidesPerView: 4,
      spaceBetween: 1000,
      //  centeredSlides: true,

    },

    640: {
      slidesPerView: 2,
      spaceBetween: 30,
      centeredSlides: true,

    },
    480: {
      slidesPerView: 1,
      spaceBetween: 20
      , centeredSlides: true,

    },
    320: {
      slidesPerView: 2,
      spaceBetween: 5,
      centeredSlides: true,
    },
  }

  return (
    <Swiper
      className='overflow-auto'
      modules={[Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      loop={true}
      speed={2000}

      autoplay={{ delay: 50 }}
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
      {partnerData.map((partner, index) => (
        <SwiperSlide key={index}>
          <img width={400} height={300} className='bg_img' src={`${partner.photo}`} alt={`Partner ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Partner