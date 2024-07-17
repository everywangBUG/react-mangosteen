import welcome3 from '../assets/images/welcome3.svg'

export const Welcome3: React.FC = () => {
  return (<div h-50vh mx-4 rounded-4 bg-white flex flex-col items-center justify-center>
    <img src={welcome3} alt="welcome3" w-40 h-40 />
    <span mt-2 font-400 text-28px>数据可视化</span>
    <span mt-2 font-400 text-28px>收支一目了然</span>
  </div>)
}
