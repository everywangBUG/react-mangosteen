import { redirect } from "react-router-dom"

export const RedirectToWelcome: React.FC = () => {
  redirect("/welcome/1")
  return null
}
