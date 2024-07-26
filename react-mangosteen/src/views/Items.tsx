import { Icon } from "../components/Icon"
import { TopNav } from "../components/TopNav"
import { GradientTopNav } from "../components/Gradient"
import { GradientTimeSelect } from "../components/Gradient"
import "./items.module.scss"

export const Items: React.FC = () => {
  return (
    <div>
      <GradientTopNav>
        <TopNav icon={<Icon name="menu" className="w-24px h-24px" />} title="橙子记账" />
      </GradientTopNav>
      <GradientTimeSelect>
        <ol flex py-8px children-mx-16px text-white>
          <li className="active">本月</li>
          <li>上月</li>
          <li>今年</li>
          <li>自定义时间</li>
        </ol>
      </GradientTimeSelect>
    </div>)
}
