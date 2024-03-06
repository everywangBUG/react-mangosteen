import { Link } from 'react-router-dom'

interface Props {
  className?: string
}

export const CurrentUser: React.FC<Props> = ({ className }) => {
  return (
  <Link to='/sign_in' className={className} bg="#ff8c09" text-white w="100%" px-16px h-88px flex flex-col justify-center block>
    <h2 text-24px>未登录用户</h2>
    <div text="#fff" mt-10px>点击这里登录</div>
  </Link>)
}
