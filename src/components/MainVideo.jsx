'use client'
import React, { useEffect, useRef, useState } from 'react'
import { fetchData } from '../../utils/api'
import { useTranslation } from 'react-i18next'

const MainVideo = () => {
  const { t, i18n } = useTranslation()



  const [data, setData] = useState('')
  const [shouldAutoPlay, setShouldAutoPlay] = useState(true)

  const videoRef = useRef(null);


  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const result = await fetchData(`api/settings`, i18n.language);
        setData(result?.data)

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromAPI();
  }, []);




  useEffect(() => {
    // Check network information
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    if (connection) {
      // Disable autoplay if the connection is slow (e.g., 3G or worse)
      const slowConnections = ['slow-2g', '2g', '3g']
      if (slowConnections.includes(connection.effectiveType)) {
        setShouldAutoPlay(false)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play()
          }
        })
      },
      { threshold: 0.4 }
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className='w-full h-screen z-0  relative'>
      <video
        ref={videoRef}
        className=" w-full h-full absolute top-0 left-0 lg:object-cover object-fill"
        src={data.home_video}
        autoPlay={shouldAutoPlay}
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