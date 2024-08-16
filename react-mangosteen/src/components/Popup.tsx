import { useSpring, animated } from "@react-spring/web";
import { useState } from "react"

interface Props {
  visible?: boolean
  children: React.ReactNode
  onClickMask?: () => void
  position?: "center" | "bottom"
  zIndex?: string
}

export const Popup: React.FC<Props> = (props) => {
  const { visible = false, children, onClickMask, position = "center", zIndex } = props
  const [maskVisible, setMaskVisible] = useState(visible)
  
  const maskStyle = useSpring({
    visibility: (maskVisible ? "visible" : "hidden") as "visible" | "hidden",
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
        fixed h-full w-full top-0 left-0 bottom-0 right-0
        style={{...maskStyle, zIndex: `calc(${zIndex}- 1)`}}
        className="bg-black:75"
        onClick={() => onClickMask?.()}
      />
      {
        position === "center"
          ?
          (
            <animated.div
              fixed items-center top="[50%]" left="[50%]" translate-x="[-50%]" translate-y="[-50%]" overflow-hidden
              style={{zIndex}}
            >
              {children}
            </animated.div>
          )
          :
          (
            <animated.div
              fixed bottom-0 left-0 flex flex-col items-center justify-center overflow-hidden w-full
              style={{zIndex}}
            >
              {children}
            </animated.div>
          )
      }
    </div>
  )
}
