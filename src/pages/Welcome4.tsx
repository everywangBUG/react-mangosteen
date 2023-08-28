import welcome from '../assets/images/welcome4.svg'

export const Welcome4: React.FC = () => {
  return (<div bg="#ffffff" flex flex-col h="100%" items-center justify-center rounded-8px>
            <img src={welcome} w-128px h-130px/>
            <div flex-col text-center>
              <span text-32px>云备份</span><br/>
              <span text-32px>不用怕数据丢失</span>
            </div>
          </div>)
}
