import { animated, useTransition } from '@react-spring/web'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useOutlet } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import { useWipe } from '../hooks/useWipe'
import { useLocalStorage } from '../stores/useLocalStorage'

export const WelcomeLayout: React.FC = () => {
  const nav = useNavigate()
  const animating = useRef(false)
  const mainRef = useRef(null)
  const map = useRef<Record<string, ReactNode>>({})
  const location = useLocation()
  const isLastPage = location.pathname === '/welcome/4'
  const outlet = useOutlet()
  const linkMap: Record<string, string> = {
    '/welcome/1': '/welcome/2',
    '/welcome/2': '/welcome/3',
    '/welcome/3': '/welcome/4',
    '/welcome/4': '/home',
  }
  const { direction } = useWipe(mainRef)
  useEffect(() => {
    if (direction === 'left') {
      if (animating.current) { return }
      animating.current = true
      nav(linkMap[location.pathname])
    }
  }, [direction, linkMap[location.pathname], location.pathname])
  const [extraStyle, setExtraStyle] = useState<{ position: 'relative' | 'absolute' }>({ position: 'relative' })
  map.current[location.pathname] = outlet
  const transitions = useTransition(location.pathname, {
    from: { transform: location.pathname === '/welcome/1' ? 'translate(0%)' : 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 1000 },
    onStart: () => {
      setExtraStyle({ position: 'absolute' })
    },
    onRest: () => {
      animating.current = false
      setExtraStyle({ position: 'relative' })
    }
  })
  const { setIsReadWelcome } = useLocalStorage()
  const onSkip = () => {
    setIsReadWelcome(true)
    nav('/home')
  }
  return (
    <div flex flex-col items-stretch bg="#6335c3"
        h-screen overflow-x-hidden
    >
      <header shrink-0 text-center my-10px mt-60px>
        <img src={logo} w-65px h-70px/>
        <h1 text="#dccff6" text-28px my-5px>橙子记账</h1>
      </header>
      <main grow-1 shrink-1 relative ref={mainRef}>
        {transitions((style, pathname) =>
            <animated.div key={pathname} style={{ ...style, ...extraStyle }} w="100%" h="100%">
              <div flex justify-center items-center bg="#ffffff" rounded-8px mx-16px h="47vh">
                {map.current[pathname]}
              </div>
            </animated.div>
        )}
      </main>
      <div>
        { !isLastPage
          && <footer shrink-0 text-center mt-40px mb-24px grid grid-cols-3 grid-rows-1>
            <Link style={{ gridArea: '1 / 2 / 2 / 3' }} text-28px text="#dccff6" to={linkMap[location.pathname]}>下一页</Link>
            <span style={{ gridArea: '1 / 3 / 2 / 4' }} text-28px text="#dccff6" onClick={onSkip}>跳过</span>
          </footer>
      }
      </div>
    </div>
  )
}
