import { useNavigate } from 'react-router-dom'
import welcome4 from '../assets/images/welcome4.svg'

export const Welcome4: React.FC = () => {
  const navigator = useNavigate()
  
  return (
    <div flex flex-col>
      <div h-50vh w-90vw rounded-4 bg-white flex flex-col items-center justify-center>
        <img src={welcome4} alt="welcome4" w-40 h-40 />
        <span mt-2 font-400 text-28px>每日提醒</span>
        <span mt-2 font-400 text-28px>不会遗漏每一笔记账</span>
      </div>
      <div font-400 text-28px mb-20px h-25vh flex items-center justify-center
       text-white onClick={() => {navigator('/home')}}>开启记账</div>
    </div>
  )
}
