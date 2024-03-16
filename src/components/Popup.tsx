import type { ReactNode } from 'react'
import { useState } from 'react'
import { animated, useSpring } from '@react-spring/web'

interface Props {
  visible: boolean
  onClickMask?: () => void
  children?: ReactNode
  position?: 'bottom' | 'center'
}

export const Popup: React.FC<Props> = ({ visible, onClickMask, children, position }) => {
  const [maskVisible, setMaskVisible] = useState(visible)

  const wrapperStyles = useSpring({
    opacity: visible ? 1 : 0,
    transform: position === 'bottom' ? (visible ? 'translateY(0%)' : 'translateY(100%)') : '',
  })

  const maskStyles = useSpring({
    visibility: (maskVisible ? 'visible' : 'hidden') as 'visible' | 'hidden',
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
      {
        position === 'bottom'
          ? <animated.div
            fixed bottom-0 left-0 w-full min-h-100px bg-white z="[calc(var(--z-popup))]" rounded-t-12px overflow-hidden
            style={wrapperStyles}
          >
            {children}
          </animated.div>
          : <animated.div
            fixed top="[50%]" left="[50%]" translate-x="-50%" translate-y="-50%" bg-white z="[calc(var(--z-popup))]" rounded-12px overflow-hidden
            style={wrapperStyles}
          >
            {children}
          </animated.div>
      }
    </div>
  )
}
