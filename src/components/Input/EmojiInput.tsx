import { useState } from 'react'
import { emojis } from '../../lib/emojis'
import s from './EmojiInput.module.scss'

type Props = {
  value?: string
  onChange?: (value: string) => void
}

export const EmojiInput: React.FC<Props> = (props) => {
  const [emojiKind, setEmojiKind] = useState('表情')
  const { value, onChange } = props

  return (
    <div className={s.wrapper} b-1 b="#ff8e0a" rounded-8px p-8px h="400px" overflow-auto>
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
          grid grid-cols="[repeat(auto-fit,36px)]" grid-rows="[repeat(auto-fit,36px)]" gap-8px justify-center children-text-24px
        >
          {emojis.chars.map(char =>
            <span className={char === value ? s.selected : ''} b-1 b-transparent rounded-4px flex justify-center items-center key={char}
              onClick={() => value !== char && onChange?.(char)}
            >
              {char}
            </span>)}
        </div>)}
      </div>
    </div>
  )
}
