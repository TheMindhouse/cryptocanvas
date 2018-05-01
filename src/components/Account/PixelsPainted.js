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
      return (
        <div>
          <h2><b>Pixels Painted</b></h2>
          <p>Stats available only with <HashLink to={URLHelper.help.installingMetamask}>MetaMask</HashLink> installed.</p>
        </div>
      )
    }

    if (this.state.isLoading) {
      return (
        <div>
          <h2><b>Pixels Painted</b></h2>
          <Spin />
        </div>
      )
    }

    const pixelsGroupedByCanvasId = groupBy(this.state.paintedPixels, pixel => pixel.canvasId)
    const paintedCanvasIds = Object.keys(pixelsGroupedByCanvasId)

    return (
      <div>
        <h2><b>{this.state.paintedPixels.length} Pixels Painted on {paintedCanvasIds.length} {paintedCanvasIds.length !== 1 ? 'canvases' : 'canvas' }</b></h2>
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
