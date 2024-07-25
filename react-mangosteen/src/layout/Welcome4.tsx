import welcome4 from '../assets/images/welcome4.svg'

export const Welcome4: React.FC = () => {
  
  return (
    <div flex flex-col>
      <div h-50vh w-90vw rounded-4 bg-white flex flex-col items-center justify-center>
        <img src={welcome4} alt="welcome4" w-40 h-40 />
        <div flex flex-col items-center justify-center>
          <span text-28px>每日提醒</span>
          <span text-28px>不会遗漏每一笔记账</span>
        </div>
      </div>
    </div>
  )
}
