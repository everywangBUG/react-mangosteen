import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { BackIcon } from '../components/BackIcon'
import { TagForm } from './tagsNew/TagForm'

export const TagsNew: React.FC = () => {
  return (
    <div>
      <Gradient className="grow-0 shrink-0">
        <TopNav title='新建标签' icon={<BackIcon />} />
      </Gradient>
      <TagForm type='create' />
    </div>
  )
}
