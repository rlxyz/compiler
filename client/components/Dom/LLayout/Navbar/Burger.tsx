import useStore from '@hooks/useStore'

export const Burger = () => {
  const userInteractions = useStore((state) => state.userInteractions)

  const handleClick = () => {
    if (userInteractions)
      userInteractions?.setDropdownOpen(!userInteractions.isDropdownOpen)
  }

  return (
    <button
      onClick={handleClick}
      className='flex md:hidden h-6 w-6 justify-center items-center'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-8 w-8'
        viewBox='0 0 33 17'
        fill='none'
      >
        <path d='M0.825195 1H33.0002' stroke='white' strokeWidth='0.95' />
        <path d='M0.412109 8.59998H32.5871' stroke='white' strokeWidth='0.95' />
        <path d='M0 16.2H32.175' stroke='white' strokeWidth='0.95' />
      </svg>
    </button>
  )
}

export const Cross = () => {
  const userInteractions = useStore((state) => state.userInteractions)

  const handleClick = () => {
    if (userInteractions) {
      userInteractions?.setDropdownOpen(!userInteractions.isDropdownOpen)
    }
  }
  return (
    <button
      onClick={handleClick}
      className='absolute top-0 right-0 mt-9 mr-9 flex md:hidden justify-center items-center'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6 '
        viewBox='0 0 24 24'
        fill='none'
      >
        <path
          d='M23.4629 23.3757L0.711731 0.624572'
          stroke='white'
          strokeWidth='0.95'
        />
        <path
          d='M0.711914 23.3757L23.4631 0.624572'
          stroke='white'
          strokeWidth='0.95'
        />
      </svg>
    </button>
  )
}
