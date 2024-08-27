import { ReactNode, TouchEventHandler, useRef, useState } from "react"

interface Props {
  className?: string
  children: ReactNode
  onEnd?: () => void
}

export const LongPressDiv: React.FC<Props> = (props) => {
  const { className, children, onEnd } = props
  const touchPosition = useRef<{x?: number, y?: number }>({x: undefined, y: undefined})
  const touchTimer = useRef<number>()

  const onTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    touchTimer.current = setTimeout(() => {
      onEnd?.()
    }, 1000)
    const { clientX: x, clientY: y } = e.touches[0]
    touchPosition.current = {x, y}
  }

  const onTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    const { clientX: newX, clientY: newY } = e.touches[0]
    const { x, y } = touchPosition.current
    if (x === undefined || y === undefined) { return }
    const distance = Math.sqrt((newX - x) ** 2 + (newY - y) ** 2)
    if (distance > 10) {
      clearTimeout(touchTimer.current)
      touchTimer.current = undefined
    }
  }

  const onTouchEnd = () => {
    if (touchTimer.current) {
      clearTimeout(touchTimer.current)
      touchTimer.current = undefined
    }
  }

  return (
    <div
      className={className}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </div>
  )
}
