import { ReactNode } from "react"

type Props = {
  label?: string | ReactNode
} & (
  | { type?: "sms_code" }
  | { type?: "email" }
)
  
export const Input: React.FC<Props> = (props) => {

  const renderInput = () => {
    switch (props.type) {
      case "email": 
        return (<>
                  <span w-form-label>邮箱地址</span>
                  <input account-input-text placeholder="请输入邮箱地址，点击发送验证码" value="" />
               </>)
          
      case "sms_code":
        return (<>
                  <span w-form-label>验证码</span>
                  <div flex justify-between gap-x-16px>
                    <input account-input-text max-w="[calc(40%-8px)]" placeholder="六位数字" value="" />
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
