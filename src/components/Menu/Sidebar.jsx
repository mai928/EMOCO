'use client'
import React from 'react'
import logo from '../../../public/assets/logo.png';
import Link from 'next/link';
import Image from 'next/image';


const Sidebar = () => {
  return (
    <div>
          <div className={`sidebar ${toggle ? "open" : ""} `}>
            <div className="p-10">
              <div className="flex justify-between items-end mb-10">
                <Link href={'/'}><Image alt="logo" width={100} height={'auto'} src={logo} /></Link>
                <h1
                  className="cursor-pointer p-1 px-3 rounded-full bg-primary_color font-semibold text-white-300"
                  onClick={() => setToggle(false)}
                >
                  x
                </h1>
              </div>

              <ul>
                {navbar.map((item) => (
                  <div key={item.name} className="flex items-center mt-7">
                    <div className="p-1 bg-white-400 rounded-full me-4">
                      <svg

                        xmlns="http://www.w3.org/2000/svg"
                        width={13}
                        height={13}
                        className="fill-primary_color  "
                        viewBox="0 0 320 512"
                      >
                        <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                      </svg>
                    </div>
                    <li>

                      <Link

                        className="text-white text-xl font-semibold   hover:text-primary-500"
                        href={item.path}
                        onClick={() => setToggle(false)}
                      >
                        {item.name}
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
                    className="fill-primary_color  "
                    viewBox="0 0 320 512"
                  >
                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                  </svg>


                </div>


              </div>
            </div>
          </div>
        </div>
  )
}

export default Sidebar