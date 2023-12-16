export const CountItems: React.FC = () => {
  return (
    <div flex bg='#252a43' m-16px p-16px rounded-lg justify-between children-px-2em text-lg text-center>
      <ol text-fuchsia>
        <li>收入</li>
        <li>200</li>
      </ol>
      <ol text-blue>
        <li>支出</li>
        <li>30</li>
      </ol>
      <ol text-cyan>
        <li>净收入</li>
        <li>170</li>
      </ol>
    </div>
  )
}
