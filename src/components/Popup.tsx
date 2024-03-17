import type { ReactNode } from 'react'
import { useState } from 'react'
import { animated, useSpring } from '@react-spring/web'

interface Props {
  visible: boolean
  onClickMask?: () => void
  children?: ReactNode
  position?: 'bottom' | 'center'
  zIndex?: string
}

export const Popup: React.FC<Props> = (props) => {
  const { visible, onClickMask, children, position, zIndex = 'var(--z-popup)' } = props
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

  return (
    <div touch-none>
      <animated.div
        fixed top-0 left-0 h-full w-full className="bg-black:75"
        style={{ ...maskStyles, zIndex: `calc(${zIndex} - 1)` }}
        onClick={() => onClickMask?.()}
      />
      {
        position === 'bottom'
          ? <animated.div
            fixed bottom-0 left-0 w-full min-h-100px bg-white rounded-t-12px overflow-hidden
            style={{ ...wrapperStyles, zIndex }}
          >
            {children}
          </animated.div>
          : <animated.div
            fixed top="[50%]" left="[50%]" translate-x="-50%" translate-y="-50%" bg-white rounded-12px overflow-hidden
            style={{ ...wrapperStyles, zIndex }}
          >
            {children}
          </animated.div>
      }
    </div>
  )
}
