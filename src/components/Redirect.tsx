import type * as React from 'react'
import { redirect } from 'react-router-dom'

export const RedirectToWelcome: React.FC = () => {
  // const navigate = useNavigate()
  // useEffect(() => {
  // navigate('/welcome/1')
  // }, [])
  redirect('/welcome/1')
  return null
}
