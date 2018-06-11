// @flow
import * as React from 'react'
import type { CountdownCounterState } from '../../hoc/renderProps/CountdownCounter'
import './styles/Countdown.css'
import * as pluralize from 'pluralize'
import { TimeLeft } from '../../types/TimeLeft'
import { padStart } from '../../helpers/strings'

type Props = {
  timeLeft: TimeLeft,
  isLoading: boolean,
}

class CountdownInline extends React.PureComponent<Props> {
  static defaultProps = {}

  render () {
    const {
      timeLeft,
      isLoading,
    } = this.props

    if (isLoading) {
      return null
    }

    return (
      <strong>
        {
          !!timeLeft.days &&
          <span>{timeLeft.days} {pluralize('Day', timeLeft.days)}&nbsp;</span>
        }
        {padStart(timeLeft.hours)}:{padStart(timeLeft.min)}:{padStart(timeLeft.sec)}
      </strong>
    )
  }
}

export { CountdownInline }
