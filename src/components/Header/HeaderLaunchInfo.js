// @flow
import * as React from 'react'
import { CountdownCounter } from '../../hoc/renderProps/CountdownCounter'
import { CountdownInline } from '../Small/CountdownInline'
import './styles/HeaderLaunchInfo.css'
import { CONFIG } from '../../config'
import { Tooltip } from 'antd'

const HeaderLaunchInfo = () => {
  return (
    <div className="HeaderLaunchInfo">
      <span className="HeaderLaunchInfo__Beta">Free Beta</span>
      <Tooltip placement="bottom" title={String(new Date(CONFIG.SHARED.LIVE_LAUNCH_DATE))}>
        Live version starts in&nbsp;
        <CountdownCounter
          date={new Date(CONFIG.SHARED.LIVE_LAUNCH_DATE)}
          render={(state) => <CountdownInline {...state} />}
        />
      </Tooltip>
    </div>
  )
}

export { HeaderLaunchInfo }
