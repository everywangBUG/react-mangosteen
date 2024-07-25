import welcome3 from '../assets/images/welcome3.svg'

export const Welcome3: React.FC = () => {
  return (
    <div h-50vh w-90vw rounded-4 bg-white flex flex-col items-center justify-center>
      <img src={welcome3} alt="welcome3" w-40 h-40 />
      <div flex flex-col items-center justify-center>
        <span text-28px>数据可视化</span>
        <span text-28px>收支一目了然</span>
      </div>
    </div>)
}
