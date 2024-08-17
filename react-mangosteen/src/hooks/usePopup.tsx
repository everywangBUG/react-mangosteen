
import ReactDOM from "react-dom"
import { useState } from "react"
import { body } from "../main"
import { Popup } from "../components/Popup"

type Options = {
  isShow?: boolean
  children: React.ReactNode
  position?: "center" | "bottom"
  zIndex?: string
}

export const usePopup = (options: Options) => {
  const { isShow = false, children = null, position = "center", zIndex } = options
  const [visible, setVisible] = useState(isShow)

  const popup = ReactDOM.createPortal(
    <Popup visible={visible} onClickMask={() =>setVisible(false) } position={position} zIndex={zIndex}>
      {children}
    </Popup>,
    body
  )
  return {
    popup,
    openPopup: () => setVisible(true),
    closePopup: () => setVisible(false),
    toggle: () => setVisible(!visible)
  }
}
