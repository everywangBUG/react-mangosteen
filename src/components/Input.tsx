import { EmojiInput } from './Input/EmojiInput'

type Props = {
  label: string
  error?: string
  value?: string
  placeholder?: string
  type?: 'text' | 'emoji'
  onChange?: (value: string) => void
}

export const Input: React.FC<Props> = (props) => {
  const { label, placeholder, value, onChange, type = 'text', error } = props

  const renderInput = () => {
    switch (type) {
      case 'text':
        return <input j-input-text type={type}
          placeholder={placeholder}
          value={value} onChange={e => onChange?.(e.target.value)}
        />
      case 'emoji':
        return <EmojiInput value={value} onChange={onChange} />
      default:
        return null
    }
  }

  return (
    <>
      <div flex flex-col gap-y-8px>
        <span j-form-label>{label}</span>
        {renderInput()}
        <span text-red>{error || '\u00A0'}</span>
      </div>
    </>
  )
}
