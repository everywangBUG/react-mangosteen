import { NavLink } from 'react-router-dom'
import { Icon } from './Icon'

export const AddButton: React.FC = () => {
  return (
    <NavLink to='/items/new'>
      <div fixed right='16px' bottom='16px'>
        <button bg='#5926b9' rounded='50%' p-8px text-white w-56px h-56px
          flex justify-center items-center
        >
          <Icon name='add' className="w-48px h-48px" />
        </button>
      </div>
    </NavLink>
  )
}
