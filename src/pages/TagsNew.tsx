import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { Icon } from '../components/Icon'
import { Input } from '../components/Input'

export const TagsNew: React.FC = () => {
  const [emojiKind, setEmojiKind] = useState('表情')
  const onSubmit = () => { /* ... */ }

  return (
    <div>
      <Gradient className="grow-0 shrink-0">
        <TopNav title='新建标签' icon={<Icon name="back" className="w-24px h-24px" />} />
      </Gradient>
      <form onSubmit={onSubmit} px-16px py-32px text-16px flex flex-col gap-y-8px>
        <Input label={'标签名'} error={'标签名称太长'} />
        <Input type='emoji' label={`图标${'🙄'}`} />
        <p>记账的时候长按即可，可以编辑</p>
        <div text-center>
          <button type="submit" w="90%" j-btn>新建标签</button>
        </div>
      </form>
    </div>
  )
}
