import { Calendar } from "../components/Calendar/Calendar"
import { time } from "../library/Time"

export const TagsNew: React.FC = () => {
  return (
    <div>
      <Calendar defaultValue={time("2023-01-01")} onChange={(date) => alert(date.toLocaleDateString())} />
      <Calendar defaultValue={time("2028-01-10")}/>
    </div>
  )
}
