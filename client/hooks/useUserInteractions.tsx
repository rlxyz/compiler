import { useState } from 'react'
import useScrollHeight from './useScrollHeight'

const useUserInteractions = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const { scrollRef, scrollProgress, onScroll } = useScrollHeight()
  const [isMedellionClicked, setIsMedellionClicked] = useState(false)
  const [isMedellionLoaded, setIsMedellionLoaded] = useState(false)
  const [isMedellionImageLoaded, setIsMedellionImageLoaded] = useState(false)
  const [isVideoTexturePlaying, setVideoTexturePlaying] = useState(false)

  return {
    isVideoTexturePlaying,
    setVideoTexturePlaying,
    isMedellionImageLoaded,
    setIsMedellionImageLoaded,
    isMedellionLoaded,
    setIsMedellionLoaded,
    isMedellionClicked,
    setIsMedellionClicked,
    isDropdownOpen,
    setDropdownOpen,
    scrollRef,
    scrollProgress,
    onScroll,
  }
}

export default useUserInteractions
