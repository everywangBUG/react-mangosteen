import { type RefObject, useEffect, useRef, useState } from 'react'

interface Config {
  onTouchStart?: (e: TouchEvent) => void
  onTouchMove?: (e: TouchEvent) => void
  onTouchEnd?: (e: TouchEvent) => void
}

export function useWipe(elementRef: RefObject<HTMLElement>, config?: Config) {
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
    const newx = e.touches[0].clientX
    const newy = e.touches[0].clientY
    const dx = newx - x.current
    const dy = newy - y.current
    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) < 3) {
        setDirection('')
      }
      else if (dx > 0) {
        setDirection('right')
      }
      else {
        setDirection('left')
      }
    }
    else {
      if (Math.abs(dy) < 3) {
        setDirection('')
      }
      else if (dy > 0) {
        setDirection('down')
      }
      else {
        setDirection('up')
      }
    }
  }
  const onTouchEnd = (e: TouchEvent) => {
    config?.onTouchEnd?.(e)
    setDirection('')
  }
  useEffect(() => {
    if (!elementRef.current) { return }
    elementRef.current.addEventListener('touchstart', onTouchStart)
    elementRef.current.addEventListener('touchmove', onTouchMove)
    elementRef.current.addEventListener('touchend', onTouchEnd)

    return () => {
      if (!elementRef.current) { return }
      elementRef.current.addEventListener('touchstart', onTouchStart)
      elementRef.current.addEventListener('touchmove', onTouchMove)
      elementRef.current.addEventListener('touchend', onTouchEnd)
    }
  }, [])

  return { direction }
}
