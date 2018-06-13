import React from 'react'
import Moment from 'react-moment'
import { CountdownInline } from '../Small/CountdownInline'
import { CountdownCounter } from '../../hoc/renderProps/CountdownCounter'

class BiddingTimeLeft extends React.PureComponent {
  timer = null

  componentDidMount () {
    this.setState({
      secondsLeft: (this.props.biddingFinishTime * 1000 - Date.now()) / 1000,
    })

    this.startTimer()
  }

  componentWillUnmount () {
    window.clearInterval(this.timer)
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      const secondsLeft = this.state.secondsLeft - 1
      if (secondsLeft >= 0) {
        this.setState({ secondsLeft })
      }
    }, 1000)
  }

  render () {
    return (
      <div>
        <h2><b>Bidding Time Left</b></h2>
        {this.props.biddingFinishTime &&
        <div>
          <h3>
            <CountdownCounter
              date={this.props.biddingFinishTime * 1000}
              render={(state) => <CountdownInline {...state} />}
            />
          </h3>
          <p><Moment date={new Date(this.props.biddingFinishTime * 1000)} format="dddd, MMMM Do YYYY, h:mm:ss a (Z"/> UTC)</p>
        </div>
        }

        {!this.props.biddingFinishTime &&
        <p>Bidding is open to anyone now. After the first bid is placed, bidding will remain available for the next 48
          hours.</p>
        }
      </div>
    )
  }
}

BiddingTimeLeft.propTypes = {}
BiddingTimeLeft.defaultProps = {}

export default BiddingTimeLeft
