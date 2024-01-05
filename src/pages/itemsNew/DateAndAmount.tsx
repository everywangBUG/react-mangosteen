import { useState } from 'react'

interface Props {
  className: string
}

export const DateAndAmount: React.FC<Props> = ({ className }) => {
  const [x, setX] = useState('')

  return (
    <div className={className}>
      <input value={x} onChange={e => setX(e.target.value)}/><br/>
      CountAndAmount<br/>
      CountAndAmount<br/>
      CountAndAmount<br/>
      CountAndAmount<br/>
      CountAndAmount<br/>
      CountAndAmount<br/>
      CountAndAmount<br/>
      CountAndAmount<br/>
      CountAndAmount<br/>
      CountAndAmount<br/>
      CountAndAmount<br/>
      CountAndAmount<br/>
      CountAndAmount<br/>
    </div>
  )
}
