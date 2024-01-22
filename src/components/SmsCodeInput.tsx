import { useEffect, useState } from 'react'

type Props = {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  request?: () => Promise<unknown>
}

export const SmsCodeInput: React.FC<Props> = (props) => {
  const { placeholder, onChange, value, request } = props
  const [count, setCount] = useState(60)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!started) { return }
    if (count === -1) {
      setCount(60)
      setStarted(false)
      return
    }
    const timer = setTimeout(() => {
      setCount(count - 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [started, count])

  const onClick = async () => {
    if (!request) { return }
    await request?.(() => {})
    // 开始倒计时
    setStarted(true)
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
