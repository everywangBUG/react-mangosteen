import ReactDOM from 'react-dom'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { Popup } from '../components/Popup'
import { rootDiv } from '../main'

export const usePopup = (isShow: boolean, children: ReactNode) => {
  const [visible, setVisible] = useState(isShow)
  // 挂载到root根节点下面防止css继承链断裂
  const popup = ReactDOM.createPortal(
  <Popup visible={visible} onClickMask={() => setVisible(false)}>
    {children}
  </Popup>, rootDiv)
  return {
    popup,
    openPopup: () => setVisible(true),
    closePopup: () => setVisible(false),
    toggle: () => setVisible(!visible),
  }
}