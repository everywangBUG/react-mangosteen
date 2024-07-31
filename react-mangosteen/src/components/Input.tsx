import { ChangeEvent, ReactNode } from "react"

type Props = {
  label?: string | ReactNode
  value: string
  onChange: (value: string) => void
  className?: string
  disabledError?: string
} & (
  | { type?: "sms_code" }
  | { type?: "email" }
)
  
export const Input: React.FC<Props> = (props) => {
  const { label, value, onChange, disabledError = true } = props

  const renderInput = () => {
    switch (props.type) {
      case "email": 
        return (<>
                  <input account-input-text placeholder="请输入邮箱地址，点击发送验证码" value={value} onChange={e => onChange?.(e.target.value)}/>
               </>)
      case "sms_code":
        return (<>
                  <div flex justify-between gap-x-16px>
                    <input account-input-text max-w="[calc(40%-8px)]" placeholder="六位数字" value={value} onChange={e => onChange(e.target.value)} />
                    <button type="button" w-btn max-w="[calc(60%-8px)]">发送验证码</button>
                  </div>
               </>)
    }
  }

  return (
    <>
      <div flex gap-x-16px gap-y-8px justify-between>
        {label ? <span w-form-label>{label}</span> : null}
        {renderInput()}
        {disabledError && <span text-red h-16px>{disabledError}</span>}
      </div>
    </>)
}
