// @flow
import React from 'react'

import withWeb3 from '../hoc/withWeb3'

import './styles/CanvasPage.css'
import CanvasPagePainting from './CanvasPageStates/CanvasPagePainting'
import CanvasPageBidding from './CanvasPageStates/CanvasPageBidding'
import CanvasPageTrading from './CanvasPageStates/CanvasPageTrading'
import CanvasPageLoading from './CanvasPageStates/CanvasPageLoading'
import { CANVAS_STATES } from '../models/CanvasState'
import { CONFIG } from '../config'
import { setDocumentTitle } from '../helpers/utils'
import { URLHelper } from '../helpers/URLhelper'
import { Redirect } from 'react-router-dom'
import { CanvasNotCreatedYet } from './CanvasPageStates/CanvasNotCreatedYet'
import { ContractModel } from '../models/ContractModel'
import { CanvasInfo } from '../models/CanvasInfo'

type Props = {
  // withWeb3
  Contract: ContractModel,
  canvasId?: number,
}

type State = {
  isLoading: boolean,
  isInvalidId: boolean,
  canvasNotCreatedYet?: boolean,
  hasError?: boolean,
  canvasInfo?: CanvasInfo,
}

class CanvasPage extends React.Component<Props, State> {
  pixelSize: number = CONFIG.pixelSize.canvas
  canvasId: number

  constructor (props) {
    super(props)

    this.canvasId = typeof props.canvasId !== 'undefined' ? props.canvasId : parseInt(props.match.params.id, 10)

    const isInvalidId = isNaN(this.canvasId) ||
      this.canvasId < 0 ||
      this.canvasId > CONFIG.MAX_TOTAL_CANVASES

    this.state = {
      isLoading: true,
      isInvalidId: isInvalidId
    }
  }

  componentDidMount () {
    this.getCanvasInfo()
    setDocumentTitle(`Canvas #${this.canvasId}`)
  }

  getCanvasInfo = () => {
    // console.log(`Getting info for Canvas #${this.canvasId}`)
    this.props.Contract.getCanvasInfo(this.canvasId)
      .then((canvasInfo) => {
        if (canvasInfo.id !== this.canvasId) {
          return this.setState({ canvasNotCreatedYet: true })
        }
        this.setState({
          canvasInfo,
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
    // console.log('[EVENT] PAINTING FINISHED!')
    this.setState({ isLoading: true }, this.getCanvasInfo)
  }

  onBiddingFinished = () => {
    // console.log('[EVENT] BIDDING FINISHED!')
    this.setState({ isLoading: true }, this.getCanvasInfo)
  }

  render () {
    const {
      isLoading,
    } = this.state

    const currentCanvasState = this.state.canvasInfo && this.state.canvasInfo.canvasState.state

    if (this.state.isInvalidId) {
      return <Redirect to={URLHelper.pageNotFound} />
    }

    if (this.state.canvasNotCreatedYet) {
      return <CanvasNotCreatedYet canvasId={this.canvasId} />
    }

    return (
      <div>

        {isLoading && <CanvasPageLoading canvasId={this.canvasId} />}

        {!isLoading && currentCanvasState === CANVAS_STATES.active &&
        <CanvasPagePainting
          canvasInfo={this.state.canvasInfo}
          pixelSize={this.pixelSize}
          canvasId={this.canvasId}
          onPaintingFinished={this.onPaintingFinished}
        />
        }

        {!isLoading && currentCanvasState === CANVAS_STATES.bidding &&
        <CanvasPageBidding
          canvasInfo={this.state.canvasInfo}
          pixelSize={this.pixelSize}
          canvasId={this.canvasId}
          onBiddingFinished={this.onBiddingFinished}
        />
        }

        {!isLoading && currentCanvasState === CANVAS_STATES.completed &&
        <CanvasPageTrading
          canvasId={this.canvasId}
          canvasInfo={this.state.canvasInfo}
          pixelSize={this.pixelSize}
          onCanvasSold={this.getCanvasInfo}
        />
        }

      </div>
    )
  }
}

export default withWeb3(CanvasPage)
