import welcome from '../assets/images/welcome3.svg'

export const Welcome3: React.FC = () => {
  return (<div bg="#ffffff" flex flex-col h="100%" items-center justify-center rounded-8px>
            <img src={welcome} w-128px h-130px/>
            <div flex-col text-center>
              <span text-32px>数据可视化</span><br/>
              <span text-32px>收支一目了然</span>
            </div>
          </div>)
}
