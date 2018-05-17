// @flow
import React from 'react'

import './PickerColor.css'
import { hexPalette } from '../../helpers/colors'
import { withAnalytics } from '../../hoc/withAnalytics'
import type { AnalyticsEvent } from '../../types/AnalyticsEvent'
import { ANALYTICS_ACTIONS, ANALYTICS_EVENTS } from '../../constants/analytics'

type Props = {
  colorId: number,
  size: number,
  changeActiveColor: (number) => void,
  isSelected: boolean,
  // withAnalytics
  analyticsAPI: {
    event: AnalyticsEvent,
  },
}

const PickerColor = (props: Props) => {
  const changeActiveColor = () => {
    props.changeActiveColor(props.colorId)

    props.analyticsAPI.event({
      category: ANALYTICS_EVENTS.painting,
      action: ANALYTICS_ACTIONS.painting.colorSelected,
      value: props.colorId,
    })
  }

  return (
    <div className={'PickerColor ' + (props.isSelected ? 'PickerColor--selected' : '')}
         style={{ width: props.size, height: props.size }}
         onClick={changeActiveColor}>
      <span className={'PickerColor__color ' + (props.colorId === 0 ? 'PickerColor__color--reset' : '')}
            style={{ backgroundColor: hexPalette[props.colorId] }} />
    </div>
  )
}

export default withAnalytics(PickerColor)