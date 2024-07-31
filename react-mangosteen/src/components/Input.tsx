import { ReactNode, useState, useEffect } from "react"

type Props = {
  label?: string | ReactNode
  value: string
  onChange: (value: string) => void
  className?: string
  disabledError?: string
  request?: () => Promise<unknown>
} & (
  | { type?: "sms_code", request: () => Promise<unknown> }
  | { type?: "email" }
)


export const Input: React.FC<Props> = (props) => {
  const [startTime, setStartTime] = useState<Date>()
  const [count, setCount] = useState(0)
  const { label, value, onChange, disabledError = true, request } = props

  const onClick = async () => {
    if (!request) return
    await request()
    setCount(60)
  }

  useEffect(() => {
      if (count > 0) {
        const interval = setInterval(() => {
          setCount(count - 1)
        }, 1000)
        return () => clearInterval(interval)
      }
    }, [count])
  
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
                    {
                      count > 0
                      ? <button type="button" w-btn max-w="[calc(60%-8px)]">{count}秒后重发</button>
                      : <button type="button" w-btn max-w="[calc(60%-8px)]" onClick={onClick}>发送验证码</button>
                    }
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
