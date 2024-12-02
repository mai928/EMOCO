'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import 'swiper/css/navigation'
import "swiper/css/pagination";
import 'swiper/css/autoplay'
import "swiper/css/effect-fade";

import { useTranslation } from 'react-i18next';
import { fetchData } from '../../utils/api';

const MobileSlider = () => {
  const { t, i18n } = useTranslation();

  const [slider, setSider] = useState([]);
  const [videoPlayed, setVideoPlayed] = useState(false); // Track video end
  const [fadeOut, setFadeOut] = useState(false); // Trigger fade-out effect
  const videoRef = useRef(null); // Reference to the video element


  useEffect(() => {
    const fetchedData = async () => {
      const data = await fetchData('api/sliders', i18n.language);
      const slides = data?.data;
      setSider(slides);
      console.log(slides)
    };

    console.log(slider)

    fetchedData();
  }, [i18n.language]);




  const handleVideoEnd = () => {

    setVideoPlayed(true)
  }

  const handlesliderchange = (swiper) => {
    console.log(swiper)
    const isLastSlide = swiper.activeIndex === swiper.slides.length; // Check if it's the last slide

    if (isLastSlide) {
      setVideoPlayed(false)
      if(videoRef.current){
      videoRef.current.play(); // Replay the video

      }
    }
  }


  return (
    <section className='w-full h-screen z-0 relative overflow-hidden'>
      {!videoPlayed ? (
        // Render the video first
        <video
          ref={videoRef}
          src="/video/GIIF.mp4" // Replace with your video file path
          className={`w-full h-full object-fill lg:object-cover `}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd} // Trigger when video ends
        />
      ) : (
        // Render the slider after video ends
        <Swiper
          className='overflow-hidden'
          modules={[Autoplay, EffectFade]}
          slidesPerView={1}
          loop={true}
          loopedSlides={slider.length} // Add this line
          speed={4000}
          autoplay={{ delay: 5000 }}
          effect='fade'
          fadeEffect={{ crossFade: true }} // Enable cross-fade for smoother transitions
          onSlideChange={handlesliderchange}
        >
          {slider?.map((partner, index) => (
            <SwiperSlide key={index}>
              <img
                loading='eager'
                className='lg:w-full lg:h-full h-[100vh]  object-cover'
                src={`${partner.photo}`}
                alt={`Partner ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default MobileSlider;
