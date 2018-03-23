import React from 'react'

import withWeb3 from '../hoc/withWeb3'

import './CanvasPage.css'
import CanvasPagePainting from './CanvasPageStates/CanvasPagePainting'
import CanvasPageBidding from './CanvasPageStates/CanvasPageBidding'
import CanvasPageTrading from './CanvasPageStates/CanvasPageTrading'
import CanvasPageLoading from './CanvasPageStates/CanvasPageLoading'

const CANVAS_STATES = {
  painting: 0,
  bidding: 1,
  trading: 2,
}

class CanvasPage extends React.Component {
  pixelSize = 20

  constructor (props) {
    super(props)

    this.canvasId = props.match.params.id

    this.state = {
      isLoading: true,
    }
  }

  componentDidMount () {
    this.getCanvasInfo()
  }

  getCanvasInfo () {
    this.props.Contract.getCanvasInfo(this.canvasId)
      .then((canvasInfo) => {
        const canvasStateKey = Object.keys(CANVAS_STATES).filter(key => CANVAS_STATES[ key ] === canvasInfo.canvasState)
        const canvasState = CANVAS_STATES[ canvasStateKey ]

        this.setState({
          canvasState,
          paintedPixels: canvasInfo.paintedPixels,
          canvasOwner: canvasInfo.owner,
          isLoading: false,
        })
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          hasError: true,
        })
      })
  }

  onFinishPainting = () => {
    console.log('[EVENT] PAINTING FINISHED!');
    this.setState({ isLoading: true }, this.getCanvasInfo)
  }

  onFinishBidding = () => {
    console.log('[EVENT] BIDDING FINISHED!');
    this.setState({ isLoading: true }, this.getCanvasInfo)
  }

  render () {
    const {
      isLoading,
      canvasState,
    } = this.state

    return (
      <div>

        {isLoading && <CanvasPageLoading canvasId={this.canvasId} />}

        {!isLoading && canvasState === CANVAS_STATES.painting &&
        <CanvasPagePainting
          pixelSize={this.pixelSize}
          paintedPixels={this.state.paintedPixels}
          canvasId={this.canvasId}
          Contract={this.props.Contract}
          web3={this.props.web3}
          onFinishPainting={this.onFinishPainting}
        />
        }

        {!isLoading && canvasState === CANVAS_STATES.bidding &&
        <CanvasPageBidding
          pixelSize={this.pixelSize}
          canvasId={this.canvasId}
          Contract={this.props.Contract}
          web3={this.props.web3}
          onFinishBidding={this.onFinishBidding}
        />
        }

        {!isLoading && canvasState === CANVAS_STATES.trading &&
        <CanvasPageTrading
          pixelSize={this.pixelSize}
          canvasId={this.canvasId}
          canvasOwner={this.state.canvasOwner}
          Contract={this.props.Contract}
          web3={this.props.web3}
        />
        }

      </div>
    )
  }
}

export default withWeb3(CanvasPage)
