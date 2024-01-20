type Props = {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  onClick?: () => void
}

export const SmsCodeInput: React.FC<Props> = (props) => {
  const { placeholder, onChange, value, onClick } = props

  return (
    <div flex gap-x-16px justify-between>
      <input j-input-text type="text" max-w="[calc(40%-8px)]" placeholder={placeholder} value={value} onChange={e => onChange?.(e.target.value)} />
      <button type='button' j-btn max-w="[calc(60%-8px)]" onClick={onClick}>发送验证码</button>
    </div>
  )
}
