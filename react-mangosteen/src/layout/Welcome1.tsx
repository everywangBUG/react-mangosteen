import welcome1 from '../assets/images/welcome1.svg'

export const Welcome1: React.FC = () => {
  return (<div w-90vw h-50vh rounded-4 bg-white flex flex-col items-center justify-center>
    <img src={welcome1} alt="welcome1" w-40 h-40/>
    <div flex flex-col items-center justify-center>
      <span text-28px>会挣钱</span>
      <span text-28px>更要会省钱</span>
    </div>
  </div>)
}
