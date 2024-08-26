'use client'
import React, { useEffect, useRef, useState } from 'react'
import { fetchData } from '../../utils/api'
import { useTranslation } from 'react-i18next'

const MainVideo = () => {
  const { i18n } = useTranslation()
  const [videoSrc, setVideoSrc] = useState('')
  const [shouldAutoPlay, setShouldAutoPlay] = useState(true)
  const videoRef = useRef(null)

  useEffect(() => {
    // Detect if the user is on a mobile device
    const isMobile = window.matchMedia('only screen and (max-width: 768px)').matches

    if (isMobile) {
      // Set local video source for mobile
      setVideoSrc('/video/video1.mp4')
    } else {
      // Fetch video source from API for desktop
      const fetchDataFromAPI = async () => {
        try {
          const result = await fetchData(`api/settings`, i18n.language)
          setVideoSrc(result?.data.home_video)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }

      fetchDataFromAPI()
    }
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
      {/* <div className='absolute left-0 top-[50%]  bg-opacity-40 bg-footer_color w-full h-[10%] lg:h-[20%]' >
        <h1 className='font-shelley text-white text-4xl lg:text-9xl  2xl:text-9xl  left-[26%] bottom-[8%] absolute text-auto-complete'>leading the stream</h1>
      </div> */}
    </div>
  )
}

export default MainVideo
