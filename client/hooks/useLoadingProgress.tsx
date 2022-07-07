import { useState } from 'react'

export const useLoadingProgress = () => {
  const [progress, setProgress] = useState(0)
  return {
    progress,
    setProgress,
  }
}
