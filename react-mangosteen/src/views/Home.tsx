import pig from '../assets/images/pig.svg'
import { AddButton } from '../components/AddButton'

export const Home: React.FC = () => {
  
  return (
    <div h-screen relative>
      <div h-full flex flex-col justify-center items-center>
        <div mb-20>
          <img src={pig} w='128px' h='130px'/>
        </div>
        <button account-start-button>开始记账</button>
      </div>
      <AddButton />
    </div>)
}
