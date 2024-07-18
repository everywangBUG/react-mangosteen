import welcome2 from '../assets/images/welcome2.svg'

export const Welcome2: React.FC = () => {
  return (<div h-50vh w-90vw rounded-4 bg-white flex flex-col items-center justify-center>
    <img src={welcome2} alt="welcome2" w-40 h-40 />
    <span mt-2 font-400 text-28px>每日提醒</span>
    <span mt-2 font-400 text-28px>不会遗漏每一笔记账</span>
  </div>)
}
