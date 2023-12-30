import { Navigate } from 'react-router-dom'
import useSWR from 'swr'
import { ajax } from '../lib/ajax'
import pig from '../assets/images/pig.svg'
import { useTitle } from '../hooks/useTitle'
import { Loading } from '../components/Loading'
import { AddButton } from '../components/AddButton'
import type { IItems, IResource, IResources, IUser } from '../global.d.ts'

interface IProps {
  title: string
}

export const Home: React.FC<IProps> = (props) => {
  useTitle(props.title)
  const { data: meData, error: meError } = useSWR('/api/v1/me', async path =>
    (await ajax.get<IResource<IUser>>(path)).data.resource
  )
  const { data: itemsData, error: itemsError } = useSWR(meData ? '/api/v1/items' : null, async path =>
    (await ajax.get<IResources<IItems>>(path)).data
  )
  const isLoadingMe = !meData && !meError
  const isLoadingItems = meData && !itemsData && !itemsError
  if (isLoadingMe || isLoadingItems) {
    return <Loading message='正在加载中...' className='h-screen'/>
  }
  if (itemsData?.resources[0]) {
    return <Navigate to='/items' />
  }
  return (
    <div h='100vh' relative>
      <div flex flex-col justify-around items-center>
        <div mt-20vh>
          <img src={pig} w='128px' h='130px'/>
        </div>
        <div mt-20vh w='100%' text-center>
          <button j-btn>开始记账</button>
        </div>
        <AddButton />
      </div>
    </div>
  )
}
