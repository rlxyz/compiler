import useStore from '@hooks/useStore'
import { useEffect, useRef } from 'react'

const LDom = ({ children }) => {
  const ref = useRef(null)
  useEffect(() => {
    useStore.setState({ dom: ref })
  }, [])

  return (
    <div
      className='absolute top-0 left-0 h-full w-full pointer-events-auto'
      ref={ref}
    >
      {children}
    </div>
  )
}

export default LDom
