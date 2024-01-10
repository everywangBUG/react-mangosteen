import { useState } from 'react'
import { emojis } from '../lib/emojis'

export const TagsNew: React.FC = () => {
  const [emojiKind, setEmojiKind] = useState('表情  ')
  const onSubmit = () => { /* ... */ }
  console.log(emojis)

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div flex flex-col>
          <span>标签名</span>
          <input j-input-text placeholder="2到4个汉字"/>
          <span text-red>标签名称太长</span>
        </div>
        <div>
          <span>符号</span>
          <div>
            {emojis.map(emojis => <span key={emojis.name} onClick={() => setEmojiKind(emojis.name)}>
              {emojis.name}
            </span>)}
          </div>
          <div>
            {emojis.map(emojis => <div key={emojis.name} style={{ display: emojis.name === emojiKind ? '' : 'none' }}>
              {emojis.chars}
            </div>)}
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
