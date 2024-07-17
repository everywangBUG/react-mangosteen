import { useRef, ReactNode } from "react"
import { animated, useTransition } from '@react-spring/web'
import { Link, useLocation, useOutlet, Navigate  } from "react-router-dom"
import logo from '../assets/images/logo.svg'

export const WelcomeLayout: React.FC = () => {
  const map = useRef<Record<string, ReactNode>>({})
  const location = useLocation()
  const outlet = useOutlet()
  map.current[location.pathname] = outlet
  const linkMap: Record<string, string> = {
    '/welcome/1': '/welcome/2',
    '/welcome/2': '/welcome/3',
    '/welcome/3': '/welcome/4',
    '/welcome/4': 'home'
  }
  const transitions = useTransition(location.pathname, {
    from: { transform: location.pathname === '/welcome/1' ? 'translateX(0%)' : 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 1000 },
    onStart: () => {},
    onRest: () => {}
  })
  console.log(transitions, 'transitions')
  console.log(linkMap, 'linkMap')
  console.log(outlet, 'outlet')
  console.log(location.pathname, 'location.pathname')
  console.log(map, 'map')

  if (!outlet) {
    return <Navigate to="/welcome/1" />
  }

  return (<div relative flex justify-center h-screen flex-col bg-orange>
            <header shrink-0 flex justify-center flex-col items-center h-25vh>
              <img src={logo} alt="logo" h-20/>
              <span text-28px mt-4 text-white font-bold>橙子记账</span>
            </header>
            <main grow-1 shrink-1>
              { 
                transitions((style, pathname) => 
                  <animated.div>
                    <div style={style}>{map.current[pathname]}</div>
                  </animated.div>
                )
              }
            </main>
            <footer shrink-0 h-25vh mb-20px w-100vw font-800 text-white flex items-end>
              <div grid grid-cols-3 grid-rows-1 w-screen>
                <span text-28px text-center onClick={() => {history.go(-1)}}>上一页</span>
                <Link text-28px text-center text-white select-none to={linkMap[location.pathname]}>下一页</Link>
                <span text-28px text-center>跳过</span>
              </div>
            </footer>
          </div>)
}
