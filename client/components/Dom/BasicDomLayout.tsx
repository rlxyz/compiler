import React from 'react'
import Footer from './LLayout/Footer'
import Navbar from '@components/Dom/LLayout/Navbar'
import Socials from '@components/Dom/LLayout/Socials'
import { LSnapshot, RSnapshot } from '@components/Dom/LLayout/Snapshot'

const BasicDomLayout: React.FC = ({ children }) => {
  return (
    <>
      <div className='w-full h-full flex justify-center items-center md:p-12 lg:p-16'>
        <div
          className={`w-full h-full relative flex justify-center items-center`}
        >
          <Socials />
          {/* <LSnapshot /> */}
          {/* <RSnapshot /> */}
          <Navbar />
          {children}
          {/* <Footer /> */}
        </div>
      </div>
    </>
  )
}

export default BasicDomLayout
