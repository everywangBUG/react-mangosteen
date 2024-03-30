import type { ReactNode } from 'react'
import { useState } from 'react'

interface Props {
  className: string
  itemDate: ReactNode
  value?: number
  onChange?: (amount: number) => void
  onSubmit?: () => void
}

export const ItemAmount: React.FC<Props> = (props) => {
  const { value, onChange, className, itemDate, onSubmit } = props
  const [output, _setOutput] = useState(() => value ? (value / 100).toString() : '0')
  const setOutput = (str: string) => {
    if (str.length > 16) { return }
    const dotIndex = str.indexOf('.')
    // 限制小数点后只能两位: 拦截器
    if (dotIndex >= 0 && str.length - dotIndex > 3) {
      return
    }
    _setOutput(str)
    onChange?.(parseFloat(str) * 100)
  }

  const clear = () => {
    setOutput('0')
  }

  const append = (value: string) => {
    switch (value) {
      case '0':
        if (output !== '0') { setOutput(output + value) }
        break
      case '.':
        if (!output.includes('.')) { setOutput(output + value) }
        break
      default:
        if (output === '0') {
          setOutput(value)
        }
        else {
          setOutput(output + value)
        }
        break
    }
  }
  return (
    <>
      <div>
        <div>
          <div flex items-center p-16px b-t-1px b-t="#ddd">
            {itemDate}
            <code flex-1 text-right text="#53A867" text-16px>{output}</code>
          </div>
        </div>
        <div py="0.5px" b="#ddd" children-bg-white bg="#ddd" grid grid-cols="[repeat(4,1fr)]"
          grid-rows="[repeat(4,48px)]" gap-1px children-text-16px
          className={className}
        >
          <button type='button' style={{ gridArea: '1 / 1 / 2 / 2' }} onClick={() => append('1')}>1</button>
          <button type='button' style={{ gridArea: '1 / 2 / 2 / 3' }} onClick={() => append('2')}>2</button>
          <button type='button' style={{ gridArea: '1 / 3 / 2 / 4' }} onClick={() => append('3')}>3</button>
          <button type='button' style={{ gridArea: '2 / 1 / 3 / 2' }} onClick={() => append('4')}>4</button>
          <button type='button' style={{ gridArea: '2 / 2 / 3 / 3' }} onClick={() => append('5')}>5</button>
          <button type='button' style={{ gridArea: '2 / 3 / 3 / 4' }} onClick={() => append('6')}>6</button>
          <button type='button' style={{ gridArea: '3 / 1 / 4 / 2' }} onClick={() => append('7')}>7</button>
          <button type='button' style={{ gridArea: '3 / 2 / 4 / 3' }} onClick={() => append('8')}>8</button>
          <button type='button' style={{ gridArea: '3 / 3 / 4 / 4' }} onClick={() => append('9')}>9</button>
          <button type='button' style={{ gridArea: '4 / 1 / 5 / 3' }} onClick={() => append('0')}>0</button>
          <button type='button' style={{ gridArea: '4 / 3 / 5 / 4' }} onClick={() => append('.')}>.</button>
          <button type='button' style={{ gridArea: '1 / 4 / 3 / 5' }} onClick={clear}>清空</button>
          <button type='submit' bg="#ff8c09" text-white style={{ gridArea: '3 / 4 / 5 / 5' }} onClick={onSubmit}>提交</button>
        </div>
      </div>
    </>
  )
}
