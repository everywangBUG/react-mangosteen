import s from 'styled-components'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'

const Gradient = s.div`
  background: linear-gradient(180deg, rgba(253,101,46,1) 0%, rgba(255,149,0,1) 100%);
`

export const Items: React.FC = () => {
  return (
    <div>
      <Gradient>
        <TopNav icon={<Icon name='menu' className='w-24px h-24px' />} title='橙子记账' />
      </Gradient>
    </div>)
}
