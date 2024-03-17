import ReactDOM from 'react-dom'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { Popup } from '../components/Popup'
import { rootDiv } from '../main'

type Options = {
  isShow?: boolean
  children: ReactNode
  position?: 'bottom' | 'center'
  zIndex?: string
}

export const usePopup = (options: Options) => {
  const { isShow = false, children, position = 'bottom', zIndex } = options
  const [visible, setVisible] = useState(isShow)
  // 传送门挂载到root根节点下面防止css继承链断裂
  const popup = ReactDOM.createPortal(
  <Popup zIndex={zIndex} visible={visible} onClickMask={() => setVisible(false)} position={position}>
    {children}
  </Popup>, rootDiv)
  return {
    popup,
    openPopup: () => setVisible(true),
    closePopup: () => setVisible(false),
    toggle: () => setVisible(!visible),
  }
}
