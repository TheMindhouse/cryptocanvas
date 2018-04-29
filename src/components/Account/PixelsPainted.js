// @flow
import * as React from 'react'
import withWeb3 from '../../hoc/withWeb3'
import { ContractModel } from '../../models/ContractModel'
import { PixelPainted } from '../../models/PixelPainted'
import { Spin } from 'antd'
import { CONFIG } from '../../config'
import { URLHelper } from '../../helpers/URLhelper'
import { HashLink } from 'react-router-hash-link'
import { groupBy } from '../../helpers/utils'
import { Link } from 'react-router-dom'

type Props = {
  // NOT user address, but from the page params!
  accountAddress: string,
  // from withWeb3
  Contract: ContractModel,
  eventsSupported: boolean,
  account: string,
}

type State = {
  paintedPixels: Array<PixelPainted>,
  isLoading: boolean,
}

class PixelsPainted extends React.Component<Props, State> {
  static defaultProps = {}

  state = {
    paintedPixels: [],
    isLoading: this.props.eventsSupported,
  }

  componentDidMount () {
    if (this.props.eventsSupported) {
      this.getPaintedPixels()
    }
  }

  componentDidUpdate (prevProps: Props) {
    if (prevProps.accountAddress !== this.props.accountAddress) {
      if (this.props.eventsSupported) {
        this.setState({ isLoading: true }, this.getPaintedPixels)
      }
    }
  }

  getPaintedPixels = () => {
    if (!this.props.accountAddress) {
      return
    }
    this.props.Contract.PixelPaintedEvent({ painter: this.props.accountAddress }, {
      fromBlock: CONFIG.startBlock,
      toBlock: 'latest'
    })
      .get((error, result) => {
        if (!error && result) {
          const paintedPixels = result.map(resultEvent => new PixelPainted(resultEvent.args))
          this.setState({ paintedPixels, isLoading: false })
        }
      })
  }

  render () {
    if (!this.props.eventsSupported) {
      return <p>Stats available only with MetaMask. See <HashLink to={URLHelper.help.installingMetamask}>Installing
        MetaMask</HashLink></p>
    }

    if (this.state.isLoading) {
      return <Spin />
    }

    const pixelsGroupedByCanvasId = groupBy(this.state.paintedPixels, pixel => pixel.canvasId)
    const paintedCanvasIds = Object.keys(pixelsGroupedByCanvasId)

    return (
      <div>
        <h3>
          {
            this.props.accountAddress === this.props.account
              ? 'You have painted '
              : 'User with this address has painted '
          }
          <b>{this.state.paintedPixels.length}</b> pixels on <b>{paintedCanvasIds.length}</b> canvases.
        </h3>
        <br />
        {
          paintedCanvasIds.map(canvasId =>
            <p key={canvasId}>
              <Link to={URLHelper.canvas(canvasId)}>
                Canvas #{canvasId}
              </Link> - <b>{pixelsGroupedByCanvasId[ canvasId ].length} pixels</b>
            </p>
          )
        }
      </div>
    )
  }
}

export default withWeb3(PixelsPainted)
