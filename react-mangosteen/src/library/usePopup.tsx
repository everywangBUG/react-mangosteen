
import ReactDOM from "react-dom"
import { useState } from "react"
import { body } from "../main"
import { Popup } from "../components/Popup"

type Options = {
  isShow?: boolean
  children?: React.ReactNode | null
}

export const usePopup = (options: Options) => {
  const { isShow = false, children = null } = options
  const [visible, setVisible] = useState(isShow)

  const popup = ReactDOM.createPortal(
    <Popup visible={visible}>
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
