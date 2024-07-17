import { useRef, ReactNode } from "react"
import { Outlet, useLocation, useOutlet } from "react-router-dom"
import logo from '../assets/images/logo.svg'

export const WelcomeLayout: React.FC = () => {
  const map = useRef<Record<string, ReactNode>>({})
  const location = useLocation()
  const outlet = useOutlet()
  map.current[location.pathname] = outlet
  console.log(outlet, 'outlet')
  console.log(location, 'location')
  console.log(map, 'map')

  return (<div relative flex justify-center h-screen flex-col bg-orange>
            <header shrink-0 flex justify-center flex-col items-center h-25vh>
              <img src={logo} alt="logo" h-20/>
              <span text-28px mt-4 text-white font-bold>橙子记账</span>
            </header>
            <main grow-1 shrink-1>
              <Outlet />
            </main>
            <footer shrink-0 h-25vh mb-20px w-100vw font-800 text-white flex items-end>
              <div grid grid-cols-3 grid-rows-1 w-screen>
                <span></span>
                <span text-28px text-center>下一页</span>
                <span text-28px text-center>跳过</span>
              </div>
            </footer>
          </div>)
}
