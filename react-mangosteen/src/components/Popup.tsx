import { useSpring, animated } from "@react-spring/web";
import { useState } from "react"

interface Props {
  visible?: boolean
  children: React.ReactNode
  onClickMask?: () => void
}

export const Popup: React.FC<Props> = (props) => {
  const { visible = false, children, onClickMask } = props
  const { maskVisible, setMaskVisible } = useState(false)
  
  const maskStyle = useSpring({
    opacity: visible ? 1 : 0,
    onStart: ({value}) => {
      if (value.opacity < 0.1) {
        setMaskVisible(true)
      }
    },
    onRest: ({value}) => {
      if (value.opacity < 0.1) {
        setMaskVisible(false)
      }
    },
    config: {
      duration: 200
    }
  })
  
  if (!visible) return null
  
  return (
    <div touch-none>
      <animated.div
        fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center flex-col className="bg-black:75"
        style={{...maskStyle}}
        onClick={() => onClickMask?.()}
      >
        {children}
      </animated.div>
    </div>
  )
}
