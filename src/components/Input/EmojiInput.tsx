import { useState } from 'react'
import { emojis } from '../../lib/emojis'

export const EmojiInput: React.FC = () => {
  const [emojiKind, setEmojiKind] = useState('表情')

  return (
    <div b-1 b="#ff8e0a" rounded-8px p-8px h="400px" overflow-auto>
      <div flex justify-between overflow-auto gap-x-8px text="#999">
        {emojis.map(emojis =>
          <span whitespace-nowrap
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
  )
}
