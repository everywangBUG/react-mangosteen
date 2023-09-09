import pig from '../assets/images/pig.svg'
import add from '../assets/icons/add.svg'

export const Home: React.FC = () => {
  return (
    <div h='100vh' relative>
      <div flex flex-col justify-around items-center>
        <div mt-20vh>
          <img src={pig} w='128px' h='130px'/>
        </div>
        <div mt-20vh w='100%' text-center>
          <button h='48px' bg='#5926b9' text-white w='90%' rounded='8px' text-18px>开始记账</button>
        </div>
        <div fixed right='16px' bottom='16px'>
          <button bg='#5926b9' rounded='50%' p-8px>
            <img src={add} h='48px' w='48px' />
          </button>
        </div>
      </div>
    </div>
  )
}
