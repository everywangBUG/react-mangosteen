import welcome1 from '../assets/images/welcome1.svg'

export const Welcome1: React.FC = () => {
  return (<div bg="#ffffff" flex flex-col h="100%" items-center justify-around rounded-8px>
            <img src={welcome1} w-128px h-130px/>
            <div flex-col text-center>
              <span text-32px>会挣钱</span><br/>
              <span text-32px>还要会省钱</span>
            </div>
          </div>)
}
