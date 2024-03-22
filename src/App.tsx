import { RouterProvider } from 'react-router-dom'
import { createContext } from 'react'
import vhCheck from 'vh-check'
import { usePopup } from './hooks/usePopup'
import { Loading } from './components/Loading'
import { router } from './routes/router'
import 'virtual:uno.css'
import './global.scss'
import 'virtual:svgsprites'

vhCheck()

export const LoadingContext = createContext({
  show: () => {}, hide: () => {}
})

export const App: React.FC = () => {
  const { popup, openPopup, closePopup } = usePopup({ children: <div><Loading className="p-16px" message="加载中"/></div>, position: 'center' })
  // 1. 使用zustand
  // 2. 使用context

  return (
    <div>
      <LoadingContext.Provider value={{ show: openPopup, hide: closePopup }}>
        <RouterProvider router={router}/>
        {popup}
      </LoadingContext.Provider>
    </div>
  )
}
