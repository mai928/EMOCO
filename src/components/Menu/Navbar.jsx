'use client';
import React, { useEffect, useState } from 'react';
import { navbar } from '@/data/data';
import logo from '../../../public/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import LanguageChanger from '../LanguageChanger';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import { fetchData } from '../../../utils/api';

const Navbar = () => {

  const path = usePathname()
  const newpath = path.startsWith('/') ? path.slice(1) : path
  // console.log(newpath)
  const { t, i18n } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMouseEnter = (id) => {
    setActiveIndex(id);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const [toggle, setToggle] = useState(false)
  const [showmenuIcon, setshowmenuIcon] = useState(false)
  const [isFixed, setIsFixed] = useState(false);
  const [data, setData] = useState('')
  const [slug, setSlug] = useState('')


  const handleFixed = () => {

    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }

  const generateLink = (basePath, title) => {
    return `${basePath}/${encodeURIComponent(title)}`;
  };

  useEffect(() => {

    if (window.scrollY >= 100) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }

    handleFixed()


    const handleSize = () => {
      if (window.innerWidth <= 1024) {
        setToggle(false)
        setshowmenuIcon(true)
      } else {
        setshowmenuIcon(false)

      }
    }


    handleSize()
    window.addEventListener('resize', handleSize)
    return () => {
      window.removeEventListener('resize', handleSize)
    }

  }, [])


  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const result = await fetchData(`api/settings`, i18n.language);
        setData(result?.data);
        // console.log('result::', result?.data)
      } catch (error) {
        console.error("Error fetching data:", error);
        // setError(error);
      }
    };

    fetchDataFromAPI();
  }, [])


  // const LOGO =`${data?.logo}`



  useEffect(() => {
    const fetchDataService = async () => {
      try {
        const response = await fetchData(`api/services`, i18n.language)
        // console.log(response?.data)
        setSlug(response?.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }


    }

    fetchDataService()
  }, [])


  return (
    <section className={`px-5 lg:px-28 z-10 fixed top-0 left-0 right-0 bottom-0  h-28  ${isFixed && 'bg-black fixed top-0 left-0 shadow-lg h-24'}`}>

      <div>
        {
          showmenuIcon === true ?
            (
              <div className='flex  justify-between items-center '>
                <Link href={'/'}>
                  <Image width={90}  src={logo} alt='Logo' />
                </Link>

                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill='white' onClick={() => setToggle(!toggle)} width={25} height={25} viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>

                </div>

              </div>
            ) : (
              <div className={`flex justify-between ${showmenuIcon === true ? 'gap-20' : 'gap-0'}`}>
                <Link href={'/'}>
                  <Image    width={140} className={`${isFixed && 'w-28'}`} src={logo} alt='Logo' />
                </Link>

               

                <div>
                  <div className='flex   gap-6 pt-6 relative'>
                    {navbar.map((nav, index) => (
                      <div key={nav.id} className='' onMouseEnter={() => handleMouseEnter(nav.id)} >
                        <ul key={index} className='py-2 flex items-center  '>
                          <li className='text-wave_gray font-semibold  relative '>
                            <Link href={nav.path}>{t(nav.name)}</Link>
                            <div>
                              {
                                activeIndex === nav.id && (<div className='border-b-[3px] rounded-lg border-solid border-secondary_color m-auto w-[85%] mt-1 ' />)
                              }
                            </div>
                          </li>

                          <div onMouseEnter={() => handleMouseEnter(nav.id)} onMouseLeave={handleMouseLeave} className='absolute flex top-20' key={index}>
                            {activeIndex === nav.id && nav.subcatagory && (
                              <div className=' z-10 bg-slate-900  border-[1px] border-solid border-gray-800 rounded-md  '>
                                {nav.subcatagory.map((item, index) => (
                                  <div className='hover:bg-slate-500 rounded-t-sm ' key={index}>
                                    <ul className='py-2 p-5' key={item.title}>

                                      <li className={`text-white`} >
                                        <Link href={generateLink(nav.path, slug[index]?.slug)}>{t(item.title)}</Link>
                                      </li>
                                    </ul>

                                    <div className={`${'border-b-[1px] border-solid border-gray-500 text-white'}`} />

                                  </div>


                                ))}
                              </div>
                            )}
                          </div>




                          {
                            nav.subcatagory && (<svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} className='fill-white' viewBox="0 0 320 512"><path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8l256 0c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" /></svg>)
                          }


                        </ul>




                      </div>
                    ))}

                    <div>
                      <LanguageChanger />
                    </div>
                  </div>

                </div>


              </div>
            )
        }


        {/* sidebar */}
        <div>
          <div className={`sidebar ${toggle ? "open" : ""} `}>
            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <Link href={'/'}><Image alt="logo" width={100} height={'auto'} src={logo} /></Link>
                <h1
                  className="cursor-pointer p-1 px-3 rounded-full text-white  bg-secondary_color font-semibold text-white-300"
                  onClick={() => setToggle(false)}
                >
                  x
                </h1>
              </div>

              <ul>
                {navbar.map((item, index) => (
                  <div onMouseEnter={() => handleMouseEnter(item.id)} onMouseLeave={handleMouseLeave} key={item.name} className="flex items-center mt-7">
                    <div className="p-1 bg-white-400 rounded-full me-4">
                      <svg

                        xmlns="http://www.w3.org/2000/svg"
                        width={13}
                        height={13}
                        className="fill-secondary_color  "
                        viewBox="0 0 320 512"
                      >
                        <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                      </svg>
                    </div>
                    <li className='relative'>

                      <Link

                        className="text-white text-xl font-semibold   hover:text-primary-500"
                        href={item.path}
                        onClick={() => setToggle(false)}
                      >
                        {item.name}
                      </Link>
                    </li>

                    {/* <div className='flex absolute bottom-0' key={index}>
                      {activeIndex === item.id && item.subcatagory && (
                        <div onMouseEnter={() => handleMouseEnter(item.id)} onMouseLeave={handleMouseLeave} className=' z-10 bg-slate-900  border-[1px] border-solid border-gray-800 rounded-md  '>
                          {item.subcatagory.map((item, index) => (
                            <div className='hover:bg-slate-500 rounded-t-sm ' key={index}>
                              <ul className='py-2 p-5' key={item.title}>
                                <li className={`text-white`} ><Link href={`/services/${decodeURIComponent(item.id)}`}>{t(item.title)}</Link></li>
                              </ul>

                              <div className={`${'border-b-[1px] border-solid border-gray-500 text-white'}`} />

                            </div>


                          ))}
                        </div>
                      )}
                    </div> */}
                  </div>

                ))}
              </ul>

              <div className="flex items-center mt-7">
                <div className="p-1 bg-white-400 rounded-full me-4">
                  <svg

                    xmlns="http://www.w3.org/2000/svg"
                    width={13}
                    height={13}
                    className="fill-secondary_color  "
                    viewBox="0 0 320 512"
                  >
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                  </svg>


                </div>
                <LanguageChanger />



              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};

export default Navbar;


