import { Icon } from "../../components/Icon"
import { time } from "../../library/Time"

interface Props {
  className?: string
}

export const TagsDate: React.FC<Props> = (props) => {
  const { className } = props
  return (
    <div className={className} p-16px b="#ddd" b-solid b-y-1px flex justify-between>
      <div gap-x-8px flex items-center>
        <Icon name="calendar" className={"w-24px h-24px"} />
        <span text-gray>{time().format("yyyy-MM-dd HH:mm:ss")}</span>
      </div>
      <span text-orange>0</span>
    </div>
  )
}
