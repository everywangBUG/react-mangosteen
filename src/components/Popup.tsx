import type { ReactNode } from 'react'
import { useState } from 'react'
import { animated, useSpring } from '@react-spring/web'

interface Props {
  visible: boolean
  onClickMask?: () => void
  children?: ReactNode
}

export const Popup: React.FC<Props> = ({ visible, onClickMask, children }) => {
  const [maskVisible, setMaskVisible] = useState(visible)

  const menuStyles = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0%)' : 'translateY(100%)',
  })

  const maskStyles = useSpring({
    opacity: visible ? 1 : 0,
    onStart: ({ value }) => {
      // 打开动画 0 -> 1
      // 关闭动画 1 -> 0
      if (value.opacity < 0.1) {
        setMaskVisible(true)
      }
    },
    onRest: ({ value }) => {
      if (value.opacity < 0.1) {
        setMaskVisible(false)
      }
    },
    config: {
      duration: 200
    }
  })

  const styles = {
    ...maskStyles,
    visibility: (maskVisible ? 'visible' : 'hidden') as 'visible' | 'hidden'
  }

  return (
    <div touch-none>
      <animated.div
        fixed top-0 left-0 h-full w-full className="bg-black:75" z="[calc(var(--z-popup))]"
        style={styles}
        onClick={() => onClickMask?.()}
      />
      <animated.div
        fixed bottom-0 left-0 w-full min-h-100px bg-white z="[calc(var(--z-popup))]"
        style={menuStyles}
      >
        {children}
      </animated.div>
    </div>
  )
}
