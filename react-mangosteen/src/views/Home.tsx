import { Link } from 'react-router-dom'
import pig from '../assets/images/pig.svg'
import { AddButton } from '../components/AddButton'

export const Home: React.FC = () => {
  
  return (
    <div h-screen relative>
      <div h-full flex flex-col justify-center items-center>
        <div mb-20>
          <img src={pig} w='128px' h='130px'/>
        </div>
        <div w='90%' text-center>
          <Link to='/items'>
            <button account-start-button>开始记账</button>
          </Link>
        </div>
      </div>
      <AddButton />
    </div>)
}
