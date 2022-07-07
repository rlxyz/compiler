import { useEffect, useState } from 'react'

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => {
      setMatches(media.matches)
    }
    media.addListener(listener)
    return () => media.removeListener(listener)
  }, [matches, query])

  return matches
}

export const useMediaSM = () => useMediaQuery('(min-width: 640px)')
export const useMediaMD = () => useMediaQuery('(min-width: 768px)')
export const useMediaLG = () => useMediaQuery('(min-width: 1024x)')
export const useMediaXL = () => useMediaQuery('(min-width: 1280px)')
export const useMedia2XL = () => useMediaQuery('(min-width: 1536px)')
