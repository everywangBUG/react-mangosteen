import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

const map: Record<string, ReactNode> = {}
export const WelcomeLayout: React.FC = () => {
  const location = useLocation() // 获取当前地址栏的信息
  // location.pathname ===== /welcome/1
  // location.pathname ===== /welcome/2
  // 拿到当前的outlet
  const outlet = useOutlet()
  // 每次进入一个新的location中，放入map，对应welcome1把welcome1存起来，以此类推
  map[location.pathname] = outlet
  const transitions = useTransition(location.pathname, {
    // 进入状态
    from: { transform: 'translateX(100%)' },
    // 稳定状态
    enter: { transform: 'translateX(0%)' },
    // 退出状态
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 1000 }
  })
  return transitions((style, pathname) => {
    return <animated.div key={pathname} style={style}>
      <div style={{ textAlign: 'center' }}>
        {/* 不显示最新的Outlet，如果显示，那么点击路由动画变化会显示之后的2，使用map显示之前缓存的Outlet */}
        {/* <Outlet /> */}
        {map[pathname]}
      </div>
    </animated.div>
  })
}
