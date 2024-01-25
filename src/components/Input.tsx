import type { ReactNode } from 'react'
import { SmsCodeInput } from './SmsCodeInput'
import { EmojiInput } from './Input/EmojiInput'

type Props = {
  label?: string | ReactNode
  error?: string
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  disableError: boolean
} & (
  | { type: 'text' }
  | { type: 'emoji' }
  | { type: 'sms_code'; request?: () => Promise<unknown> }
  | { type: 'select'; options: { value: string; text: string }[] }
)

export const Input: React.FC<Props> = (props) => {
  const { label, placeholder, value, onChange, type, error, disableError } = props

  const renderInput = () => {
    switch (props.type) {
      case undefined:
      case 'text':
        return <input j-input-text type={type}
          placeholder={placeholder}
          value={value} onChange={e => onChange?.(e.target.value)}
        />
      case 'emoji':
        return <EmojiInput value={value} onChange={value => onChange?.(value)} />
      case 'sms_code':
        return (<SmsCodeInput value={value} onChange={value => onChange?.(value)} request={props.request} />)
      case 'select':
        return <select value={value} onChange={e => onChange?.(e.target.value)} className='h-36px'>
          <option value="">请选择</option>
          {
            props.options?.map(option => (
              <option key={option.value} value={option.value}>{option.text}</option>
            ))
          }
        </select>
      default:
        return null
    }
  }

  return (
    <>
      <div flex flex-col gap-y-8px>
        {label ? <span j-form-label>{label}</span> : null}
        {renderInput()}
        { disableError ? null : <span text-red>{error || '　'}</span>}
      </div>
    </>
  )
}
