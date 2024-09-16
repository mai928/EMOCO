'use client'
import React, { useEffect, useRef, useState } from 'react'
import { fetchData } from '../../utils/api'
import { useTranslation } from 'react-i18next'
import MobileSlider from './MobileSlider'

const MainVideo = () => {
  const { i18n } = useTranslation()
  const [videoSrc, setVideoSrc] = useState('')
  const [shouldAutoPlay, setShouldAutoPlay] = useState(true)
  const videoRef = useRef(null)
  const [isMobile, setMobile] = useState(false)


  useEffect(() => {
    const handleMobile = () => {
      setMobile(window.matchMedia('only screen and (max-width: 400px)').matches)

    }
    handleMobile()

    window.addEventListener('resize', handleMobile)
    return () => window.removeEventListener('resize', handleMobile)

  }, [])

  useEffect(() => {

    const fetchDataFromAPI = async () => {
      try {
        const result = await fetchData(`api/settings`, i18n.language)
        setVideoSrc(result?.data.home_video)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchDataFromAPI()

  }, [i18n.language])

  useEffect(() => {
    // Check network information and adjust autoplay
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    if (connection) {
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
      { threshold: 0.5 }
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className='w-full h-screen z-0 relative'>

      {
        isMobile ? (<MobileSlider />) : (
          <video
            ref={videoRef}
            className='w-full h-full absolute top-0 left-0 lg:object-cover object-fill'
            src={videoSrc}
            autoPlay={shouldAutoPlay}
            preload='metadata'
            loop
            muted
            playsInline
          />
        )
      }

      {/* <div className='absolute left-0 top-[50%]  bg-opacity-40 bg-footer_color w-full h-[10%] lg:h-[20%]' >
        <h1 className='font-shelley text-white text-4xl lg:text-9xl  2xl:text-9xl  left-[26%] bottom-[8%] absolute text-auto-complete'>leading the stream</h1>
      </div> */}

    </div>
  )
}

export default MainVideo
