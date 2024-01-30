import { Navigate } from 'react-router-dom'
import { useLocalStorage } from '../stores/useLocalStorage'

export const Root: React.FC = () => {
  const { isReadWelcome } = useLocalStorage()
  if (isReadWelcome) {
    return <Navigate to={'/home'} />
  }
  return <Navigate to={'/welcome/1'} />
}
