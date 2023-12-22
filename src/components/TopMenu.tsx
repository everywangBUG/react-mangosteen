import React, { useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { CurrentUser } from './TopMenu/currentUser'
import { MenuList } from './TopMenu/MenuList'

interface Props {
  onClickMask?: () => void
  visible?: boolean
}

export const TopMenu: React.FC<Props> = (props) => {
  const { onClickMask, visible } = props
  const [maskVisible, setMaskVisible] = useState(visible)

  const menuStyles = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0%)' : 'translateX(-100%)',
  })

  const maskStyles = useSpring({
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
    }
  })

  const styles = {
    ...maskStyles,
    visibility: (maskVisible ? 'visible' : 'hidden') as 'visible' | 'hidden'
  }

  return (
    <>
      <animated.div fixed top-0 left-0 w="100%" h="100%" className="bg-black:75" z="[calc(var(--z-menu)-1)]"
        onClick={onClickMask} style={styles}
      >
      </animated.div>
      <animated.div fixed top-0 left-0 w-50vw max-w-20em h-screen flex flex-col z="[var(--z-menu)]" style={menuStyles}>
        <CurrentUser className="grow-0 shrink-0" />
        <MenuList className="grow-1 shrink-1" />
      </animated.div>
    </>
  )
}
