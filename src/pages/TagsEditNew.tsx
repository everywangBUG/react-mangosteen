import { useNavigate, useParams } from 'react-router-dom'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { Icon } from '../components/Icon'
import { useAjax } from '../lib/ajax'
import { TagForm } from './tagsNew/TagForm'

export const TagsEditNew: React.FC = () => {
  const onDeleteComfirm = (fn: () => void) => () => {
    const res = window.confirm('是否确定删除？')
    if (res) {
      fn()
    }
  }

  const nav = useNavigate()
  const { destroy } = useAjax({ showLoading: true, handleError: true })
  const { id } = useParams()
  const onDelete = onDeleteComfirm(async () => {
    if (!id) { throw new Error('id 不能为空') }
    await destroy(`/api/v1/tags/${id}`).catch((error) => { window.alert('删除失败'); throw error })
    window.alert('删除成功')
    nav('/items/new')
  })
  return (
    <div>
      <Gradient className="grow-0 shrink-0">
        <TopNav title='查看标签' icon={<Icon name="back" className="w-24px h-24px" />} />
      </Gradient>
      <TagForm type="edit" />
      <div p-b-32px p-x-16px text-center>
        <button j-btn w='90%' bg='#E10505' onClick={onDelete}>删除</button>
      </div>
    </div>
  )
}
