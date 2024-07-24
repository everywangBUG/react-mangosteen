import { useRef, useState, useEffect } from 'react'

interface Config {
  onTouchStart?: (e: TouchEvent) => void
  onTouchMove?: (e: TouchEvent) => void
  onTouchEnd?: (e: TouchEvent) => void
}

export const useSwipe = (mainRef: React.RefObject<HTMLDivElement>, config?: Config) => {
  const [direction, setDirection] = useState<'' | 'left' | 'right' | 'up' | 'down'>('')
  const x = useRef(-1)
  const y = useRef(-1)
  const onTouchStart = (e: TouchEvent) => {
    config?.onTouchStart?.(e)
    x.current = e.touches[0].clientX
    y.current = e.touches[0].clientY
  }
  
  const onTouchMove = (e: TouchEvent) => {
    config?.onTouchMove?.(e)
    const dx = e.touches[0].clientX - x.current
    const dy = e.touches[0].clientY - y.current
    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) < 5) {
        setDirection('')
      } else if (dx > 5) {
        setDirection('right')
      } else if (dx < -5) {
        setDirection('left')
      }
    } else {
      if (Math.abs(dy) < 5) {
        setDirection('')
      } else if (dy > 5) {
        setDirection('down')
      } else if (dy < -5) {
        setDirection('up')
      }
    }
  }

  const onTouchEnd = (e: TouchEvent) => {
    config?.onTouchEnd?.(e)
    setDirection('')
  }

  useEffect(() => {
    if (!mainRef.current) return
    mainRef.current.addEventListener('touchstart', onTouchStart)
    mainRef.current.addEventListener('touchmove', onTouchMove)
    mainRef.current.addEventListener('touchend', onTouchEnd)

    const mainElement = mainRef.current

    return () => {
      mainElement?.removeEventListener('touchstart', onTouchStart)
      mainElement?.removeEventListener('touchmove', onTouchMove)
      mainElement?.removeEventListener('touchend', onTouchEnd)
    }
  }, [mainRef])

  return { direction }
}
