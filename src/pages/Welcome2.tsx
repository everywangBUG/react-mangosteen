import welcome from '../assets/images/welcome2.svg'

export const Welcome2: React.FC = () => {
  return (<div bg="#ffffff" flex flex-col h="100%" items-center justify-center rounded-8px>
            <img src={welcome} w-128px h-130px/>
            <div flex-col text-center>
              <span text-32px>每日提醒</span><br/>
              <span text-32px>不会遗漏每一笔账单</span>
            </div>
          </div>)
}
