import { useNavigate, useParams } from 'react-router-dom'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { BackIcon } from '../components/BackIcon'
import { useAjax } from '../lib/ajax'
import { onDeleteComfirm } from '../lib/windowConfirm'
import { TagForm } from './tagsNew/TagForm'

export const TagsEditNew: React.FC = () => {
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
        <TopNav title='查看标签' icon={<BackIcon />} />
      </Gradient>
      <TagForm type="edit" />
      <div p-b-32px p-x-16px text-center>
        <button j-btn w='90%' bg='#E10505' onClick={onDelete}>删除</button>
      </div>
    </div>
  )
}
