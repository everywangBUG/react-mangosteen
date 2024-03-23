import useSWR from 'swr'
import { useAjax } from '../../lib/ajax'

export const CountItems: React.FC = () => {
  const { get } = useAjax()
  const { data } = useSWR('/api/v1/items/balance', async path => {
    const response = await get<Balance>(path)
    return response.data
  })

  return (
    <div flex bg='#252a43' m-16px rounded-lg justify-between children-px-2em text-lg text-center>
      <ol text-fuchsia>
        <li>收入</li>
        <li>{data?.income}</li>
      </ol>
      <ol text-blue>
        <li>支出</li>
        <li>{data?.expenses}</li>
      </ol>
      <ol text-cyan>
        <li>净收入</li>
        <li>{data?.balance}</li>
      </ol>
    </div>
  )
}
