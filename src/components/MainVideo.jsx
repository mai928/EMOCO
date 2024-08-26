'use client'
import React, { useEffect, useRef, useState } from 'react'
import { fetchData } from '../../utils/api'
import { useTranslation } from 'react-i18next'

const MainVideo = () => {
  const { t, i18n } = useTranslation()



      const [data ,setData]=useState('')
      const videoRef = useRef(null);


      useEffect(() => {
        const fetchDataFromAPI = async () => {
            try {
                const result = await fetchData(`api/settings`,i18n.language);
                setData(result?.data)

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataFromAPI();
    }, []);




      useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                videoRef.current.play();
              }
            });
          },
          { threshold: 0.9 }
        );
    
        observer.observe(videoRef.current);
    
        return () => observer.disconnect();
      }, []);
         
  return (
    <div className='w-full h-screen z-0  relative'>
      <video
      ref={videoRef}
        className=" w-full h-full absolute top-0 left-0 lg:object-cover object-fill"
        src={data.home_video}
        autoPlay
        preload="metadata"
        loop
        muted
        playsInline
      />
      {/* <div className='absolute left-0 top-[50%]  bg-opacity-40 bg-footer_color w-full h-[10%] lg:h-[20%]' >
        <h1 className='font-shelley text-white text-4xl lg:text-9xl  2xl:text-9xl  left-[26%] bottom-[8%] absolute text-auto-complete'>leading the stream</h1>
      </div> */}


    </div>
    )
}

export default MainVideo