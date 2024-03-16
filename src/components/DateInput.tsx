type Props = {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

export const DateInput: React.FC<Props> = (props) => {
  const { value, placeholder, onChange } = props
  return (<div>
    <input j-input-text type='text'
          placeholder={placeholder}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          readOnly
        />
  </div>)
}
