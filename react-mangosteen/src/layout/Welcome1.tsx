import welcome1 from '../assets/images/welcome1.svg'

export const Welcome1: React.FC = () => {
  return (<div h-50vh w-90vw rounded-4 bg-white flex flex-col items-center justify-center>
    <img src={welcome1} alt="welcome1" w-40 h-40 />
    <span mt-2 font-400 text-28px>会挣钱</span>
    <span mt-2 font-400 text-28px>更要会省钱</span>
  </div>)
}
