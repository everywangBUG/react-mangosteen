import { Link } from 'react-router-dom'
import useSWR from 'swr'
import { useAjax } from '../../lib/ajax'

interface Props {
  className?: string
}

export const CurrentUser: React.FC<Props> = ({ className }) => {
  const { get } = useAjax({ showLoading: false, handleError: false })
  const { data, error } = useSWR('/api/v1/me', async (path) => {
    const response = await get<IResource<IUser>>(path)
    return response.data.resource
  })
  const name = data?.name ?? data?.email
  const signOut = () => {}
  return (
    <>
    {
      error
        ? <Link to='/sign_in' className={className} bg="#ff8c09" text-white w="100%" px-16px h-88px flex flex-col justify-center block>
        <h2 text-24px>未登录用户</h2>
        <div text="#fff" mt-10px>点击这里登录</div>
      </Link>
        : <div onClick={signOut} bg="#ff8c09" text-white w="100%" px-16px h-88px flex flex-col justify-center block>
          <h2 text-24px text-ellipsis overflow-hidden>{name}</h2>
          <div text="#fff" mt-10px>点击这里退出登录</div>
      </div>
    }
    </>)
}
