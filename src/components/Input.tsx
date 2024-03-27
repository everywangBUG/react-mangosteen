import type { ChangeEvent, ReactNode } from 'react'
import { SmsCodeInput } from './SmsCodeInput'
import { EmojiInput } from './Input/EmojiInput'
import { DateInput } from './DateInput'

type Props<T> = {
  label?: string | ReactNode
  error?: string
  value?: T
  placeholder?: string
  onChange?: (value: T) => void
  disableError?: boolean
  className?: string
} & (
  | { type?: 'text' }
  | { type?: 'emoji' }
  | { type?: 'sms_code'; request?: () => Promise<unknown> }
  | { type?: 'select'; options: { value: string; text: string }[] }
  | { type?: 'date' }
)

export const Input = <T extends string>(props: Props<T>) => {
  const { className, label, placeholder, value, onChange: _onChange, type, error, disableError } = props

  const onChange = (e: string | ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (typeof e === 'string') {
      _onChange?.(e as T)
    } else {
      _onChange?.(e.target.value as T)
    }
  }

  const common = { onChange, value, placeholder }

  const renderInput = () => {
    switch (props.type) {
      case undefined:
      case 'text':
        return <input j-input-text type={type} {...common} />
      case 'emoji':
        return <EmojiInput {...common} />
      case 'sms_code':
        return (<SmsCodeInput {...common} request={props.request} />)
      case 'select':
        return <select {...common} className='h-36px'>
          <option value="">请选择</option>
          {
            props.options?.map(option => (
              <option key={option.value} value={option.value}>{option.text}</option>
            ))
          }
        </select>
      case 'date':
        return <DateInput {...common} />
      default:
        return null
    }
  }

  return (
    <>
      <div flex flex-col gap-y-8px className={className}>
        {label ? <span j-form-label>{label}</span> : null}
        {renderInput()}
        { disableError ? null : <span text-red>{error || '　'}</span>}
      </div>
    </>
  )
}
