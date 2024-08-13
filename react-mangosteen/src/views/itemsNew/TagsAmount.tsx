interface Props {
  className?: string
}

export const TagsAmount: React.FC<Props> = ({ className }) => {
  return (
    <div grid grid-cols="[repeat(4,1fr)]" grid-rows="[repeat(4,48px)]" children-text-20px children-text-center
      b="#fff" shrink-0 grow-1 children-bg-white py="0.5px" gap-1px bg="#ddd" className={className}
    >
      <button type="button" style={{gridArea: "1/2/2/3"}}>2</button>
      <button type="button" style={{gridArea: "1/1/2/2"}}>1</button>
      <button type="button" style={{gridArea: "1/3/2/4"}}>3</button>
      <button type="button" style={{gridArea: "2/1/3/2"}}>4</button>
      <button type="button" style={{gridArea: "2/2/3/3"}}>5</button>
      <button type="button" style={{gridArea: "2/3/3/4"}}>6</button>
      <button type="button" style={{gridArea: "3/1/4/2"}}>7</button>
      <button type="button" style={{gridArea: "3/2/4/3"}}>8</button>
      <button type="button" style={{gridArea: "3/3/4/4"}}>9</button>
      <button type="button" style={{gridArea: "4/1/5/3"}}>0</button>
      <button type="button" style={{gridArea: "4/3/5/4"}}>.</button>
      <button type="button" style={{gridArea: "1/4/3/5"}}>清空</button>
      <button type="button" style={{gridArea: "3/4/5/5"}} bg-orange>提交</button>
    </div>
  )
}
