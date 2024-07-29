export const ItemSummary: React.FC = () => {
  return (
    <>
      <div flex bg-orange-3 my-10px mx-10px h-72px rounded-8px justify-around items-center>
        <div flex flex-col children-text-gray-1 text-center>
          <span>111</span>
          <span>收入</span>
        </div>
        <div flex flex-col children-text-gray-1 text-center>
          <span>222</span>
          <span>支出</span>
        </div>
        <div flex flex-col children-text-gray-1 text-center>
          <span>333</span>
          <span>合计</span>
        </div>
      </div>
    </>)
}
