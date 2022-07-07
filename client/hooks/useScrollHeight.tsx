import { useCallback, useEffect, useRef, useState } from 'react'

const useScrollHeight = () => {
  const scrollRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const onScroll = () => {
    setScrollProgress(
      scrollRef.current.scrollTop /
        (scrollRef.current.scrollHeight - scrollRef.current.clientHeight)
    )
  }

  return { scrollRef, onScroll, scrollProgress }
}

export default useScrollHeight
