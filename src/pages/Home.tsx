import { Navigate } from 'react-router-dom'
import useSWR from 'swr'
import { ajax } from '../lib/ajax'
import pig from '../assets/images/pig.svg'
import add from '../assets/icons/add.svg'
import { useTitle } from '../hooks/useTitle'

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
    return <div>加载中...</div>
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
          <button h='48px' bg='#5926b9' text-white w='90%' rounded='8px' text-18px>开始记账</button>
        </div>
        <div fixed right='16px' bottom='16px'>
          <button bg='#5926b9' rounded='50%' p-8px>
            <img src={add} h='48px' w='48px' />
          </button>
        </div>
      </div>
    </div>
  )
}
