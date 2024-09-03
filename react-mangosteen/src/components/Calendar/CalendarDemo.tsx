import React, { SetStateAction, useCallback, useEffect, useRef, useState } from "react"

interface CalendarProps {
  value?: Date
  defaultValue?: Date
  onChange?: (value: Date) => void
}

function useMergeState<T>(
  defaultStateValue: T,
  props?: {
    defaultValue?: T,
    value?: T,
    onChange?: (value: T) => void
  }
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const { value: propsValue, defaultValue, onChange } = props || {}
  const isFirstRender = useRef(true)
  const [stateValue, setStateValue] = useState(() => {
    if (propsValue !== undefined) {
      return propsValue
    } else if (defaultValue !== undefined){
      return defaultValue
    } else {
      return defaultStateValue
    }
  })

  useEffect(() => {
    if (propsValue !== undefined && !isFirstRender.current) {
      setStateValue(propsValue)
    }
    isFirstRender.current = false
  }, [propsValue])

  const mergeValue = propsValue !== undefined ? propsValue : stateValue

  function isFunction(value: unknown): value is Function {
    return typeof value === "function"
  }

  const setState = useCallback((value: SetStateAction<T>) => {
    const res = isFunction(value) ? value(stateValue) : value
    if (propsValue === undefined) {
      setStateValue(res)
    }
    onChange?.(res)
  }, [stateValue])

  return [mergeValue, setState]
}

export const CalendarDemo: React.FC<CalendarProps> = (props) => {
  const { value: propsValue, defaultValue, onChange } = props
  const [mergeValue, setValue] = useMergeState(new Date(), {
    value: propsValue,
    defaultValue,
    onChange
  })

  const changeValue = (date: Date) => {
    if (propsValue === undefined) {
      setValue(date)
    }
    onChange?.(date)
  }

  return (
    <>
      {mergeValue?.toLocaleDateString()}
      <div onClick={() => changeValue(new Date("2024-9-1"))}>2024-9-1</div>
      <div onClick={() => changeValue(new Date("2024-9-2"))}>2024-9-2</div>
      <div onClick={() => changeValue(new Date("2024-9-3"))}>2024-9-3</div>
    </>
  )
}


export const Test: React.FC = () => {
  const [value, setValue] = useState(new Date("2024-9-1")) // 受控模式
  return (
    // 非受控模式
    // <Calendar  defaultValue={new Date()} onChange={date => console.log(date.toLocaleDateString())}/>
    // 受控模式
    <CalendarDemo value={value  } defaultValue={new Date()} onChange={date => {console.log(date.toLocaleDateString()); setValue(date)}}/>
  )
}
