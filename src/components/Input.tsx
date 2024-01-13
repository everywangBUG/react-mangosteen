import type { ReactNode } from 'react'
import { EmojiInput } from './Input/EmojiInput'

type Props = {
  label: string | ReactNode
  error?: string
  value?: string
  placeholder?: string
  type?: 'text' | 'emoji' | 'sms_code'
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
        return <EmojiInput value={value} onChange={value => onChange?.(value)} />
      case 'sms_code':
        return (<div flex gap-x-16px justify-between>
          <input j-input-text type="text" max-w="[calc(40%-8px)]" placeholder={placeholder} value={value} onChange={e => onChange?.(e.target.value)} />
          <button j-btn max-w="[calc(60%-8px)]">发送验证码</button>
        </div>)
      default:
        return null
    }
  }

  return (
    <>
      <div flex flex-col gap-y-8px>
        <span j-form-label>{label}</span>
        {renderInput()}
        <span text-red>{error || '　'}</span>
      </div>
    </>
  )
}
