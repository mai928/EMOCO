import React from 'react'
import MainVideo from './MainVideo'
import MobileSlider from './MobileSlider'

const MainComponets = ({params}) => {
  return (
   <section className='h-screen'>
    {/* <MainVideo params={params}/> */}
    <MobileSlider/>
   </section>
  )
}

export default MainComponets