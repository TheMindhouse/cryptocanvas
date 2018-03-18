import React from 'react'

import withWeb3 from '../hoc/withWeb3'
import { Row } from 'antd'

import './CanvasPage.css'
import CanvasPagePainting from './CanvasPageStates/CanvasPagePainting'
import CanvasPageBidding from './CanvasPageStates/CanvasPageBidding'
import CanvasPageTrading from './CanvasPageStates/CanvasPageTrading'
import CanvasPageLoading from './CanvasPageStates/CanvasPageLoading'
import { CanvasInfoModel } from '../models/CanvasInfoModel'



const CANVAS_STATES = {
  painting: 0,
  bidding: 1,
  trading: 2,
}

class CanvasPage extends React.Component {
  pixelSize = 10
  canvasId = 1

  constructor () {
    super()

    this.state = {
      isLoading: true,
    }
  }

  componentDidMount () {
    this.props.Contract.getCanvasInfo(0, { gas: 3000000 }, (error, result) => {
      const canvasInfo = new CanvasInfoModel(result)
      let canvasState
      if (!error) {
        const canvasStateKey = Object.keys(CANVAS_STATES).filter(key => CANVAS_STATES[ key ] === canvasInfo.canvasState)
        canvasState = CANVAS_STATES[ canvasStateKey ]
      } else {
        console.error(error)
      }

      this.setState({
        canvasState,
        isLoading: false,
      })
    })
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
        <p>TEST</p> &&
        <CanvasPagePainting
          pixelSize={this.pixelSize}
          canvasId={this.canvasId}
          Contract={this.props.Contract}
          web3={this.props.web3}
        />
        }

        {!isLoading && canvasState === CANVAS_STATES.bidding &&
        <CanvasPageBidding canvasId={this.canvasId} />
        }

        {!isLoading && canvasState === CANVAS_STATES.trading &&
        <CanvasPageTrading canvasId={this.canvasId} />
        }

      </div>
    )
  }
}

export default withWeb3(CanvasPage)
