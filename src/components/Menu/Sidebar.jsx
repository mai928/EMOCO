'use client'
import React from 'react'
import logo from '../../../public/assets/logo.png';
import Link from 'next/link';
import Image from 'next/image';
import LanguageChanger from '../LanguageChanger';
import { navbar } from '@/data/data';


const Sidebar = ({handleMouseEnter ,handleMouseLeave ,t ,data ,toggle ,setToggle}) => {
  return (
    <div>
          <div className={`sidebar ${toggle ? "open" : "close"} `}>
            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <Link href={'/'}><img alt="logo" width={100} height={'auto'} src={data?.logo} /></Link>
              </div>

              <ul>
                {navbar.map((item) => (
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
                        onClick={() => setToggle(!toggle)}
                      >
                        {t(item.name)}
                      </Link>
                    </li>

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
                <LanguageChanger/>



              </div>
            </div>
          </div>
        </div>
  )
}

export default Sidebar