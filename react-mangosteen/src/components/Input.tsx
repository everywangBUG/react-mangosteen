import { ChangeEvent, ReactNode } from "react"

type Props = {
  label?: string | ReactNode
  value: string
  onInput: (event: ChangeEvent<HTMLInputElement>) => void
} & (
  | { type?: "sms_code" }
  | { type?: "email" }
)
  
export const Input: React.FC<Props> = (props) => {
  const { label, value, onInput } = props

  const renderInput = () => {
    switch (props.type) {
      case "email": 
        return (<>
                  <span w-form-label>{label}</span>
                  <input account-input-text placeholder="请输入邮箱地址，点击发送验证码" value={value} onChange={onInput}/>
               </>)
      case "sms_code":
        return (<>
                  <span w-form-label>{label}</span>
                  <div flex justify-between gap-x-16px>
                    <input account-input-text max-w="[calc(40%-8px)]" placeholder="六位数字" value={value} onChange={onInput} />
                    <button type="button" w-btn max-w="[calc(60%-8px)]">发送验证码</button>
                  </div>
               </>)
    }
  }

  return (
    <>
      <div flex gap-x-16px gap-y-8px justify-between>
        {renderInput()}
      </div>
    </>)
}
