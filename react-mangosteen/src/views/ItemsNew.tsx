import { GradientTopNav } from "../components/Gradient"
import { BackIcon } from "../components/BackIcon"
import { TopNav } from "../components/TopNav"

export const ItemsNew: React.FC = () => {
  return (
    <GradientTopNav>
      <TopNav title="记一笔" icon={<BackIcon name="back" className="w-24px h-24px" />}/>
    </GradientTopNav>
  )
}
