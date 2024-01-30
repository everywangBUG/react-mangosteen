import { useEffect, useRef, useState } from 'react'

type Props = {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  request?: () => Promise<unknown>
}

const maxCount = 60
export const SmsCodeInput: React.FC<Props> = (props) => {
  const { placeholder, onChange, value, request } = props
  const [count, setCount] = useState(maxCount)
  const [started, setStarted] = useState<Date>()
  const timer = useRef<number>()

  const clearTimer = () => {
    if (timer.current) {
      window.clearInterval(timer.current)
      timer.current = undefined
    }
  }

  useEffect(() => {
    if (started) {
      timer.current = window.setInterval(() => {
        const time = new Date()
        const seconds = Math.round((time.getTime() - started.getTime()) / 1000)
        if (maxCount - seconds <= 0) {
          setStarted(undefined)
        }
        setCount(maxCount - seconds)
      }, 1000)
    }
    else {
      clearTimer()
    }
    return () => {
      clearTimer()
    }
  }, [started, count])

  const onClick = async () => {
    if (!request) { return }
    await request()
    // 开始倒计时
    setStarted(new Date())
  }
  return (
    <div flex gap-x-16px justify-between>
      <input j-input-text type="text" max-w="[calc(40%-8px)]" placeholder={placeholder} value={value} onChange={e => onChange?.(e.target.value)} />
      {
        started
          ? <button type='button' j-btn max-w="[calc(60%-8px)]">{count}秒后重新获取</button>
          : <button type='button' j-btn max-w="[calc(60%-8px)]" onClick={onClick}>发送验证码</button>
        }
    </div>
  )
}
