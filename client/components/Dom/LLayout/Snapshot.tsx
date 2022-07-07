// Camera SVG Component with Wrapper
export const LSnapshot = () => (
  <div className='hidden sm:block absolute top-0 left-0 z-[1000]'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='52'
      height='52'
      viewBox='0 0 52 52'
      fill='none'
    >
      <path
        d='M51 1H4C2.34315 1 1 2.34315 1 4V51'
        stroke='white'
        strokeOpacity='1'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  </div>
)

export const RSnapshot = () => (
  <div className='hidden sm:block absolute bottom-0 right-0 z-[1000]'>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='52'
      height='52'
      viewBox='0 0 52 52'
      fill='none'
    >
      <path
        d='M0.999999 51H48C49.6569 51 51 49.6569 51 48V1'
        stroke='white'
        strokeOpacity='1'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  </div>
)
