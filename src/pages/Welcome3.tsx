import welcome from '../assets/images/welcome3.svg'

export const Welcome3: React.FC = () => {
  return (<div text-center>
            <img src={welcome} w-128px h-130px/>
            <div text-center>
              <span text-32px>数据可视化</span><br/>
              <span text-32px>收支一目了然</span>
            </div>
          </div>)
}
