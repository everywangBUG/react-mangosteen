import { ReactNode, useState } from "react"

interface Props {
  value?: number
  className?: string
  onSubmit?: () => void
  tagsDate: ReactNode
}

export const TagsAmount: React.FC<Props> = (props) => {
  const { className, onSubmit, value, tagsDate } = props
  const [output, _setOutput] = useState(() => value?.toString() || "0")
  
  const setOutput = (value: string) => {
    if (value.length > 16) return
    const dotIndex = value.indexOf(".")
    if (dotIndex > -1 && value.length - dotIndex > 3) return
    _setOutput(value)
  }

  const append = (value: string) => {
    switch(value) {
    case "0": 
      if (value !== "0") { setOutput(output + value) }
      break
    case ".":
      if (!output.includes(".")) { setOutput(output + value) }
      break
    default: 
      if (output === "0") {
        setOutput(value)
      } else {
        setOutput(output + value)
      }
      break
    }
  }
  
  return (
    <>
      <div p-16px b="#ddd" b-solid b-y-1px flex justify-between>
        {tagsDate}
        <span text-orange>{output}</span>
      </div>
      <div grid grid-cols="[repeat(4,1fr)]" grid-rows="[repeat(4,48px)]" children-text-20px children-text-center
        b="#fff" shrink-0 grow-0 children-bg-white py="0.5px" gap-1px bg="#ddd" className={className}
      >
        <button type="button" style={{gridArea: "1/1/2/2"}} onClick={() => append("1")}>1</button>
        <button type="button" style={{gridArea: "1/2/2/3"}} onClick={() => append("2")}>2</button>
        <button type="button" style={{gridArea: "1/3/2/4"}} onClick={() => append("3")}>3</button>
        <button type="button" style={{gridArea: "2/1/3/2"}} onClick={() => append("4")}>4</button>
        <button type="button" style={{gridArea: "2/2/3/3"}} onClick={() => append("5")}>5</button>
        <button type="button" style={{gridArea: "2/3/3/4"}} onClick={() => append("6")}>6</button>
        <button type="button" style={{gridArea: "3/1/4/2"}} onClick={() => append("7")}>7</button>
        <button type="button" style={{gridArea: "3/2/4/3"}} onClick={() => append("8")}>8</button>
        <button type="button" style={{gridArea: "3/3/4/4"}} onClick={() => append("9")}>9</button>
        <button type="button" style={{gridArea: "4/1/5/3"}} onClick={() => append("0")}>0</button>
        <button type="button" style={{gridArea: "4/3/5/4"}} onClick={() => append(".")}>.</button>
        <button type="button" style={{gridArea: "1/4/3/5"}} onClick={() => setOutput("0")}>清空</button>
        <button type="submit" style={{gridArea: "3/4/5/5"}} bg-orange onClick={onSubmit}>提交</button>
      </div>
    </>
  )
}
