import { Navigate } from "react-router-dom"

export const RedirectToWelcome: React.FC = () => {
  return <Navigate to="/welcome/1" />
}
