import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { Icon } from '../components/Icon'
import { TagForm } from './tagsNew/TagForm'

export const TagsEditNew: React.FC = () => {
  return (
    <div>
      <Gradient className="grow-0 shrink-0">
        <TopNav title='查看标签' icon={<Icon name="back" className="w-24px h-24px" />} />
      </Gradient>
      <TagForm type="edit" />
      <div p-b-32px p-x-16px text-center>
        <button j-btn w='90%' bg='#E10505'>删除</button>
      </div>
    </div>
  )
}
