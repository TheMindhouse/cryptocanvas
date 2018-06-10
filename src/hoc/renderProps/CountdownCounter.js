// Based on work by Kristin Baumann
// https://medium.com/@kristin_baumann/react-countdown-6455838b6faf

// @flow
import * as React from 'react'
import { TimeLeft } from '../../types/TimeLeft'

type Props = {
  date: Date,
  render: TimeLeft => any
}

export type CountdownCounterState = {
  timeLeft: TimeLeft,
  isLoading: boolean,
}

class CountdownCounter extends React.PureComponent<Props, CountdownCounterState> {
  static defaultProps = {}

  state = {
    timeLeft: {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    },
    isLoading: true,
  }

  timer: any

  componentDidMount () {
    // Update counter every second
    this.timer = setInterval(() => {
      const timeLeft = this.calculateTimeLeft(this.props.date)
      if (timeLeft) {
        return this.setState({ timeLeft, isLoading: false })
      }
      this.setState({ isLoading: false })
      this.clearTimer()
    }, 1000)
  }

  componentWillUnmount () {
    this.clearTimer()
  }

  clearTimer = () => {
    window.clearInterval(this.timer)
  }

  calculateTimeLeft = (endDate: Date): ?TimeLeft => {
    let diff = (Date.parse(String(new Date(endDate))) - Date.parse(String(new Date()))) / 1000

    // clear countdown when date is reached
    if (diff <= 0) return null

    const timeLeft: TimeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    }

    // calculate time difference between now and expected date
    if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400))
      diff -= timeLeft.years * 365.25 * 86400
    }
    if (diff >= 86400) { // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400)
      diff -= timeLeft.days * 86400
    }
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600)
      diff -= timeLeft.hours * 3600
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60)
      diff -= timeLeft.min * 60
    }
    timeLeft.sec = diff

    return timeLeft
  }

  render () {
    return this.props.render(this.state)
  }
}

export { CountdownCounter }
