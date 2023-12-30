import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { Icon } from '../components/Icon'

export const SiginIn: React.FC = () => {
  return (
    <>
      <Gradient>
        <TopNav title='登录' icon={<Icon name="back" className="w-24px h-24px" />} />
      </Gradient>
    </>
  )
}
