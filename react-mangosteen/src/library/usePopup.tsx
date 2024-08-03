
import ReactDOM from "react-dom"
import { useState } from "react"
import { rootDiv } from "../main"
import { Popup } from "../components/Popup"

type Options = {
  isShow?: boolean
  children?: React.ReactNode
}

export const usePopup = (options: Options) => {
  const { isShow, children } = options
  const [visible, setVisible] = useState(isShow)
  const popup = ReactDOM.createPortal(
    <Popup visible={visible}>
      {children}
    </Popup>,
    rootDiv
  )
  return {
    popup,
    openPopup: () => setVisible(true),
    closePopup: () => setVisible(false),
    toggle: () => setVisible(!visible)
  }
}
