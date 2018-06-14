import React from 'react'
import withWeb3 from '../../hoc/withWeb3'
import { CountdownCounter } from '../../hoc/renderProps/CountdownCounter'
import { CountdownInline } from '../Small/CountdownInline'
import { URLHelper } from '../../helpers/URLhelper'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

class BiddingCanvasExtras extends React.PureComponent {
  render () {
    const {
      highestBid,
      canvasId,
    } = this.props
    return (
      <div>
        {
          highestBid &&
          <div>
            <small>Last Bid:</small>
            <h2><b>{parseFloat(this.props.web3.fromWei(highestBid.amount, 'ether'))} ETH</b></h2>
            <small>Time left:</small>
            <h3 title={new Date(highestBid.finishTime * 1000)}>
              <CountdownCounter
                date={highestBid.finishTime * 1000}
                render={(state) => <CountdownInline {...state} />}
              />
            </h3>
            <div className="text-center">
              <Link to={URLHelper.canvas(canvasId)}>
                <Button type="primary" size="large">Make a Bid</Button>
              </Link>
            </div>
          </div>
        }

        {
          !highestBid &&
          <div>
            <p>No bids yet, be the first!</p>
            <div className="text-center">
              <Link to={URLHelper.canvas(canvasId)}>
                <Button type="primary" size="large">Make a Bid</Button>
              </Link>
            </div>
          </div>
        }
      </div>
    )
  }
}

BiddingCanvasExtras.propTypes = {}
BiddingCanvasExtras.defaultProps = {}

export default withWeb3(BiddingCanvasExtras)
