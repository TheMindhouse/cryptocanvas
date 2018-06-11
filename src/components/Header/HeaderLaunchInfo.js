// @flow
import * as React from 'react'
import { CountdownCounter } from '../../hoc/renderProps/CountdownCounter'
import { CountdownInline } from '../Small/CountdownInline'
import './styles/HeaderLaunchInfo.css'

const HeaderLaunchInfo = () => {
  return (
    <div className="HeaderLaunchInfo">
      <span className="HeaderLaunchInfo__Beta">Free Beta</span>
      Live version starts in&nbsp;
      <CountdownCounter
        date={new Date(1530446400000)}
        render={(state) => <CountdownInline {...state} />}
      />
    </div>
  )
}

export { HeaderLaunchInfo }
