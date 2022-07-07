import Image from 'next/image'
import NoiseBgImage from 'public/images/noise-bg.png'

export const ImageBackground = () => {
  return (
    <>
      <div className='absolute w-full h-full top-0 left-0'>
        <Image
          priority
          className='blur-sm opacity-20'
          alt='left background'
          src='https://rlxyz.nyc3.cdn.digitaloceanspaces.com/dreamlab/reflections/landing-client/main_bg.jpeg'
          layout='fill'
          objectFit='cover'
        />
      </div>
    </>
  )
}

export const NoiseBackground = () => {
  return (
    <div className='absolute w-screen md:w-[calc(100vw-6rem)] lg:w-[calc(100vw-8rem)] h-full top-0 left-0'>
      <Image
        className='blur-sm opacity-20'
        alt='left background'
        placeholder='blur'
        src={NoiseBgImage}
        layout='fill'
        objectFit='cover'
      />
    </div>
  )
}
