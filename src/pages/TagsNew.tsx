import { useState } from 'react'
import { emojis } from '../lib/emojis'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { Icon } from '../components/Icon'

export const TagsNew: React.FC = () => {
  const [emojiKind, setEmojiKind] = useState('表情')
  const onSubmit = () => { /* ... */ }

  return (
    <div>
      <Gradient className="grow-0 shrink-0">
        <TopNav title='新建标签' icon={<Icon name="back" className="w-24px h-24px" />} />
      </Gradient>
      <form onSubmit={onSubmit} px-16px py-32px text-16px flex flex-col gap-y-8px>
        <div flex flex-col gap-y-8px>
          <span>标签名</span>
          <input j-input-text placeholder="2到4个汉字"/>
          <span text-red>标签名称太长</span>
        </div>
        <div flex flex-col gap-y-8px>
            <div flex items-center gap-x-8px>
              <span>符号:</span>
              <span text-24px>😃</span>
            </div>
          <div b-1 b="#ff8e0a" rounded-8px p-8px h="400px" overflow-auto>
            <div flex justify-between overflow-auto gap-x-8px text="#999">
              {emojis.map(emojis => <span whitespace-nowrap
                className={emojis.name === emojiKind ? 'text-[#ff8e0a]' : ''}
                key={emojis.name} onClick={() => setEmojiKind(emojis.name)}>
                {emojis.name}
              </span>)}
            </div>
            <div mt-8px>
              {emojis.map(emojis => <div key={emojis.name}
                style={{ display: emojis.name === emojiKind ? '' : 'none' }}
                grid grid-cols="[repeat(auto-fit,24px)]" grid-rows="[repeat(auto-fit,24px)]" gap-8px justify-center
              >
                {emojis.chars.map(char => <span flex justify-center items-center text-24px key={char}>{char}</span>)}
              </div>)}
            </div>
          </div>
        </div>
        <p>记账的时候长按即可，可以编辑</p>
        <div text-center>
          <button type="submit" w="90%" j-btn>新建标签</button>
        </div>
      </form>
    </div>
  )
}
