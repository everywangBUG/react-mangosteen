import { useState } from "react"
import { animated, useSpring } from "@react-spring/web"
import { CurrentUser } from "./TopMenu/CurrentUser"
import { MenuList } from "./TopMenu/MenuList"

interface Props {
  visible?: boolean
  onClose: () => void
}

export const TopMenu: React.FC<Props> = (props) => {
  const [maskVisible, setMaskVisible] = useState(false)
  const { visible, onClose } = props
  
  const menuStyles = useSpring({
    transform: visible ? "translateX(0%)" : "translateX(-100%)",
    opacity: visible ? 1 : 0
  })

  const menuMaskStyles = useSpring({
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

  const styles = {
    ...menuMaskStyles,
    visibility: (maskVisible ? "visible" : "hidden") as "hidden" | "visible",
  }
  
  return (
    <>
      <animated.div fixed w="100%" h="100%" absolute top-0 left-0 className="bg-black:75" z="[calc(var(--z-menu)-1)]"
        style={styles} onClick={onClose}></animated.div>
      <animated.div absolute top-0 left-0 w="50%" flex flex-col bg-white h-screen style={menuStyles} z="[var(--z-menu)]">
        <CurrentUser className={"shrink-0 grow-0 h-100px"} />
        <MenuList className={"shrink-1 grow-1"}/>
      </animated.div>
    </>)
}
