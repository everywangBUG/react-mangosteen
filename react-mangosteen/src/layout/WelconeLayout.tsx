import { useRef, ReactNode } from "react"
import { Outlet, useLocation, useOutlet } from "react-router-dom"

export const WelcomeLayout: React.FC = () => {
  const map = useRef<Record<string, ReactNode>>({})
  const location = useLocation()
  const outlet = useOutlet()
  map.current[location.pathname] = outlet
  console.log(outlet, 'outlet')
  console.log(location, 'location')
  console.log(map, 'map')

  return (<div flex flex-col h-screen bg="orange">
            <header></header>
            <main>
              <Outlet />
            </main>
            <footer></footer>
          </div>)
}
