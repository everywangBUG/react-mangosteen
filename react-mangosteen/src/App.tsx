import { router } from  './route/route'
import { RouterProvider } from 'react-router-dom'
import './global.scss'

const App: React.FC = () => {
  return (
      <RouterProvider router={router} />
    )
}

export default App
