import React from 'react'

import withWeb3 from '../hoc/withWeb3'

import './styles/CanvasPage.css'
import CanvasPagePainting from './CanvasPageStates/CanvasPagePainting'
import CanvasPageBidding from './CanvasPageStates/CanvasPageBidding'
import CanvasPageTrading from './CanvasPageStates/CanvasPageTrading'
import CanvasPageLoading from './CanvasPageStates/CanvasPageLoading'
import { CANVAS_STATES } from '../models/CanvasState'
import { CONFIG } from '../config'

class CanvasPage extends React.Component {
  pixelSize = CONFIG.pixelSize.canvas

  constructor (props) {
    super(props)

    this.canvasId = parseInt(props.match.params.id, 10)

    this.state = {
      isLoading: true,
    }
  }

  componentDidMount () {
    this.getCanvasInfo()
  }

  getCanvasInfo = () => {
    console.log(`Getting info for Canvas #${this.canvasId}`);
    this.props.Contract.getCanvasInfo(this.canvasId)
      .then((canvasInfo) => {
        // const canvasStateKey = Object.keys(CANVAS_STATES).filter(key => CANVAS_STATES[ key ] === canvasInfo.canvasState)
        // const canvasState = new CanvasState(this.canvasId, canvasInfo.canvasState) CANVAS_STATES[ canvasStateKey ]

        this.setState({
          canvasState: canvasInfo.canvasState,
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

  onPaintingFinished = () => {
    console.log('[EVENT] PAINTING FINISHED!');
    this.setState({ isLoading: true }, this.getCanvasInfo)
  }

  onBiddingFinished = () => {
    console.log('[EVENT] BIDDING FINISHED!');
    this.setState({ isLoading: true }, this.getCanvasInfo)
  }

  render () {
    const {
      isLoading,
      canvasState = {},
    } = this.state

    return (
      <div>

        {isLoading && <CanvasPageLoading canvasId={this.canvasId} />}

        {!isLoading && canvasState.state === CANVAS_STATES.active &&
        <CanvasPagePainting
          pixelSize={this.pixelSize}
          paintedPixels={this.state.paintedPixels}
          canvasId={this.canvasId}
          onPaintingFinished={this.onPaintingFinished}
        />
        }

        {!isLoading && canvasState.state === CANVAS_STATES.bidding &&
        <CanvasPageBidding
          pixelSize={this.pixelSize}
          canvasId={this.canvasId}
          onBiddingFinished={this.onBiddingFinished}
        />
        }

        {!isLoading && canvasState.state === CANVAS_STATES.completed &&
        <CanvasPageTrading
          pixelSize={this.pixelSize}
          canvasId={this.canvasId}
          canvasOwner={this.state.canvasOwner}
          onCanvasSold={this.getCanvasInfo}
        />
        }

      </div>
    )
  }
}

export default withWeb3(CanvasPage)
