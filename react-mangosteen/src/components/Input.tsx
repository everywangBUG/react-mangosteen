import { ReactNode, useState, useEffect, useRef } from "react"

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
  | { type?: "data" }
)

const maxCount = 60
export const Input: React.FC<Props> = (props) => {
  const [startTime, setStartTime] = useState<Date>()
  const [count, setCount] = useState(maxCount)
  const { label, value, onChange, disabledError = true, request } = props
  const timer = useRef<number>()

  const onClick = async () => {
    if (!request) return
    await request()
    setStartTime(new Date())
  }

  const clearTimer = () => {
    clearInterval(timer.current)
    timer.current = undefined
  }

  useEffect(() => {
    if (startTime) {
      timer.current = setInterval(() => {
        const seconds = Math.round((new Date().getTime() - startTime.getTime()) / 1000)
        if (maxCount - seconds <= 0) {
          setStartTime(undefined)
        }
        setCount(maxCount - seconds)
      }, 1000)
    } else {
      clearTimer()
    }
    return () => {
      clearTimer()
    }
  }, [startTime, count])
  
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
            startTime
              ? <button type="button" w-btn max-w="[calc(60%-8px)]">{count}秒后重发</button>
              : <button type="button" w-btn max-w="[calc(60%-8px)]" onClick={onClick}>发送验证码</button>
          }
        </div>
      </>)
    case "data":
      return (<>
        <input account-input-text placeholder="请输入数据" value={value} onChange={e => onChange(e.target.value)} />
      </>)
    }
  }

  return (
    <>
      <div flex flex-col gap-x-16px gap-y-8px justify-between>
        {label ? <span w-form-label>{label}</span> : null}
        {renderInput()}
        {disabledError && <span text-red h-16px>{disabledError}</span>}
      </div>
    </>)
}
