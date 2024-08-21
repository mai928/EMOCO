import React from 'react'
import { fetchData } from '../../utils/api'

const MainVideo = async({params}) => {
       const {locale}=params
       console.log(locale)
     const videoData = await fetchData(`api/settings`,locale)
    //  console.log('videoData::::',videoData?.data)
      const data =  videoData?.data
         
  return (
    <div className='w-full h-screen z-0  relative'>
      
      <video
        className=" w-full h-full absolute top-0 left-0 object-cover"
        src={data.home_video}
        autoPlay
        loop
        muted
      />
      {/* <div className='absolute left-0 top-[50%]  bg-opacity-40 bg-footer_color w-full h-[10%] lg:h-[20%]' >
        <h1 className='font-shelley text-white text-4xl lg:text-9xl  2xl:text-9xl  left-[26%] bottom-[8%] absolute text-auto-complete'>leading the stream</h1>
      </div> */}
    </div>
    )
}

export default MainVideo