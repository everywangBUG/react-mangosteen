import ReactDOM from 'react-dom'
import { useState } from 'react'
import { Popup } from '../components/Popup'

export const usePopup = () => {
  const [visible, setVisible] = useState(false)
  const popup = ReactDOM.createPortal(<Popup visible={visible} onClickMask={() => setVisible(false)}/>, document.body)
  return {
    popup,
    openPopup: () => setVisible(true),
    closePopup: () => setVisible(false),
    toggle: () => setVisible(!visible),
  }
}
