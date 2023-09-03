import { useStorage } from '../store/useStorage'

export const Demo: React.FC = () => {
  const state = useStorage()

  return <div>
    <div>{state.count}</div>
    <button onClick={() => state.increaseCount()}>点击+1</button>
    </div>
}
