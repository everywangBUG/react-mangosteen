import welcome from '../assets/images/welcome1.svg'

export const Welcome1: React.FC = () => {
  return (<div text-center>
            <img src={welcome} w-128px h-130px/>
            <div text-center>
              <span text-32px>会挣钱</span><br/>
              <span text-32px>还要会省钱</span>
            </div>
          </div>)
}
