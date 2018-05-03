// @flow
import * as React from 'react'
import withWeb3 from '../../hoc/withWeb3'
import { ContractModel } from '../../models/ContractModel'
import { Spin } from 'antd'
import { URLHelper } from '../../helpers/URLhelper'
import { HashLink } from 'react-router-hash-link'
import { Link } from 'react-router-dom'

type PaintedPixelsOnCanvas = {
  canvasId: number,
  count: number,
}

type Props = {
  // NOT user address, but from the page params!
  accountAddress: string,
  // from withWeb3
  Contract: ContractModel,
  eventsSupported: boolean,
  account: string,
}

type State = {
  paintedPixels: Array<PaintedPixelsOnCanvas>,
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

    this.props.Contract.getCanvasCount()
      .then((canvasCount) => {
        const canvasIds = Array.from(new Array(canvasCount), (val, index) => index)
        const pPixelsCount = canvasIds.map(canvasId => this.props.Contract.getPaintedPixelsCountByAddress(this.props.accountAddress, canvasId))
        Promise.all(pPixelsCount).then((allPixelsCount: Array<number>) => {
          const paintedPixels = allPixelsCount
            .map((count: number, canvasId: number): PaintedPixelsOnCanvas => ({ canvasId, count }))
            .filter(pixelsCount => pixelsCount.count)
          this.setState({ paintedPixels, isLoading: false })
        })
      })
  }

  render () {
    if (!this.props.eventsSupported) {
      return (
        <div>
          <h2><b>Pixels Painted</b></h2>
          <p>Stats available only with <HashLink to={URLHelper.help.installingMetamask}>MetaMask</HashLink> installed.
          </p>
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

    const paintedPixelsCount = this.state.paintedPixels.reduce((prevValue: number, paintedPixel: PaintedPixelsOnCanvas): number => {
      return prevValue + paintedPixel.count
    }, 0)

    return (
      <div>
        <h2><b>{paintedPixelsCount} Pixels Painted
          on {this.state.paintedPixels.length} {this.state.paintedPixels.length !== 1 ? 'Canvases' : 'Canvas'}</b></h2>
        {
          this.state.paintedPixels.map((paintedPixels: PaintedPixelsOnCanvas) =>
            <p key={paintedPixels.canvasId}>
              <Link to={URLHelper.canvas(paintedPixels.canvasId)}>
                Canvas #{paintedPixels.canvasId}
              </Link> - <b>{paintedPixels.count} pixels</b>
            </p>
          )
        }
      </div>
    )
  }
}

export default withWeb3(PixelsPainted)
