import { Link, useNavigate } from 'react-router-dom'
import welcome from '../assets/images/welcome4.svg'

export const Welcome4: React.FC = () => {
  const nav = useNavigate()
  const onStart = () => {
    nav('/welcome/xxx')
  }

  return (
    <div flex flex-col>
      <div text-center>
        <img src={welcome} w-128px h-130px/>
        <div text-center>
          <span text-32px>云备份</span><br/>
          <span text-32px>不用怕数据丢失</span>
        </div>
      </div>
      <div text-center mt-10>
        <Link text-32px color="#6035BF" font-bold to="/items" onClick={onStart}>开启应用</Link>
      </div>
    </div>
  )
}
