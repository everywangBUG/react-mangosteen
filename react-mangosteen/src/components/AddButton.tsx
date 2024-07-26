import { NavLink } from "react-router-dom"
import { Icon } from "../components/Icon"

export const AddButton: React.FC = () => {
  return (
    <NavLink to={"/items/new"}>
      <div fixed right="16px" bottom="16px" rounded="50%" bg-orange w="48px" h="48px" p-2>
        <Icon name="add" className="w-48px h-48px"/>
      </div>
    </NavLink>)
}
