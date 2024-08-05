import { useEffect, useState } from "react"
import { getCurrentUser } from "../../service/views/signIn/SignIn"
import { Link } from "react-router-dom"
import { GradientTop } from "../Gradient"

interface Props {
  className?: string
}

export const CurrentUser: React.FC<Props> = ({ className }) => {
  const [user, setUser] = useState("")

  const getUserInfo = async () => {
    return await getCurrentUser()
  }

  useEffect(() => {
    const res: Promise<Resource<User>> = getUserInfo()
    res.then((res) => {
      setUser(res?.resource?.name || res?.resource?.email)
    })
  }, [])

  const clickSignIn = () => {
    return (
      <Link to="/sign_in" children-text-20px children-text-white gap-y-8px>
        <h2>未登录用户</h2>
        <span>点击登录</span>
      </Link>)
  }

  return (
    <GradientTop>
      <div className={className} flex flex-col justify-center px-16px gap-y-8px children-text-20px children-text-white>
        <h2 overflow-hidden text-ellipsis>{user}</h2>
        <div>{user ? "点击退出登录" : clickSignIn()}</div>
      </div>
    </GradientTop>)
}
