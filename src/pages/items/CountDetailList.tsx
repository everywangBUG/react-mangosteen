import { AddButton } from '../../components/AddButton.js'
import type { IItems } from '../../global.d.ts'

interface Props {
  items: IItems[]
}

export const CountDetailList: React.FC<Props> = ({ items }) => {
  return (
    <div>
      <ol>
        { items.map(item =>
          <li key={item.id} grid grid-cols="[auto_1fr_auto]" grid-rows-2 px-16px py-8px gap-x-8px border-b-1 b="#EEE">
            <div row-start-1 col-start-1 row-end-3 col-end-2 w-48px h-48px text-24px bg="#D8D8D8" rounded="50%"
              flex justify-center items-center
            >
              💖
            </div>
            <div row-start-1 col-start-2 row-end-2 col-end-3 flex items-center>旅行</div>
            <div row-start-2 col-start-2 row-end-3 col-end-3 text="#999999" flex items-center>{item.created_at}</div>
            <div row-start-1 col-start-3 row-end-3 col-end-4 flex items-center text="#53A867">
              { `￥${item.amount}` }
            </div>
          </li>
        )}
      </ol>
      <div flex justify-center items-center p-16px>
        <button w-btn>加载更多</button>
      </div>
      <AddButton />
    </div>
  )
}
