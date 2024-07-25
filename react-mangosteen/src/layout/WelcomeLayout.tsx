import { useRef, ReactNode, useState, useEffect } from "react"
import { animated, useTransition } from '@react-spring/web'
import { Link, useLocation, useOutlet, Navigate, useNavigate  } from "react-router-dom"
import logo from '../assets/images/logo.svg'
import useSkipWelcome from "../store/useSkipWelcome"
import { useSwipe } from '../hooks/useSwipe'

export const WelcomeLayout: React.FC = () => {
  const map = useRef<Record<string, ReactNode>>({})
  const location = useLocation()
  const outlet = useOutlet()
  const navigate = useNavigate()
  const { setIsSkip } = useSkipWelcome()
  const animating = useRef(false)
  const mainRef = useRef<HTMLDivElement>(null)
  const { direction } = useSwipe(mainRef, { onTouchStart: e => e.preventDefault() })
  map.current[location.pathname] = outlet
  const linkMap: Record<string, string> = {
    '/welcome/1': '/welcome/2',
    '/welcome/2': '/welcome/3',
    '/welcome/3': '/welcome/4',
    '/welcome/4': '/home'
  }
  const isLastPage = location.pathname === '/welcome/4'
  const [extraStyle, setExtraStyle] = useState<{position: 'relative' | 'absolute'}>({position: 'relative'})
  const transitions = useTransition(location.pathname, {
    from: { transform: location.pathname === '/welcome/1' ? 'translateX(0%)' : 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 1000 },
    onStart: () => {
      setExtraStyle({position: 'absolute'})
    },
    onRest: () => {
      animating.current = false
      setExtraStyle({position: 'relative'})
    }
  })

  useEffect(() => {
    if (direction === 'left') {
      if (animating.current) return
      animating.current = true
      navigate(linkMap[location.pathname])
    }
  }, [direction, linkMap[location.pathname], location.pathname])

  if (!outlet) {
    return <Navigate to="/welcome/1" />
  }
  
  const skipWelcome = () => {
    navigate('/home')
    setIsSkip('yes')
  }

  return (
    <div relative flex justify-center h-screen flex-col bg-orange overflow-x-hidden>
      <header shrink-0 flex justify-center flex-col items-center my-40px>
        <img src={logo} alt="logo" h-20/>
        <span text-28px mt-4 text-white font-bold>橙子记账</span>
      </header> 
      <main grow-1 shrink-1 relative ref={mainRef}>
        { 
          transitions((style, pathname) =>
            <animated.div key={pathname} w="100%" h="100%" absolute style={{...style, ...extraStyle}}>
              <div flex justify-center>{map.current[pathname]}</div>
            </animated.div>
          )
        }
      </main>
      {
        !isLastPage
        ? <footer shrink-0 h-25vh mb-20px w-100vw font-800 text-white flex items-end>
            <div grid grid-cols-3 grid-rows-1 w-screen>
              <span></span>
              <Link text-28px text-center text-white select-none to={linkMap[location.pathname]}>下一页</Link>
              <span text-28px text-center onClick={skipWelcome}>跳过</span>
            </div>
          </footer>
        : <div  h-25vh flex items-center justify-center>
            <Link font-800 text-28px text-white to={'/home'}>
                开启记账
            </Link>
          </div>
      }
    </div>)
}
