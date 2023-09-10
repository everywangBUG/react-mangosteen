import add from '../assets/icons/add.svg'

export const AddButton: React.FC = () => {
  return (
    <div fixed right='16px' bottom='16px'>
      <button bg='#5926b9' rounded='50%' p-8px>
        <img src={add} h='48px' w='48px' />
      </button>
    </div>
  )
}
