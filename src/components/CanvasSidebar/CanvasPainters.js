// @flow
import * as React from 'react'
import { Modal } from 'antd'
import { Link } from 'react-router-dom'
import { isAddressNull } from '../../helpers/strings'
import withWeb3 from '../../hoc/withWeb3'
import { ContractModel } from '../../models/ContractModel'
import { CanvasPaintersModal } from '../Modals/CanvasPaintersModal'
import { LocalStorageManager } from '../../localStorage'
import { CanvasPaintersCache } from '../../models/CanvasPaintersCache'

type Props = {
  canvasId: number,
  canvasPainters: ?Object,
  isCanvasLoading: boolean,
  isCanvasFinished: boolean,
  // withWeb3
  Contract: ContractModel,
}

type State = {
  canvasPainters: ?Object,
}

class CanvasPainters extends React.PureComponent<Props, State> {
  static defaultProps = {}

  state = {
    canvasPainters: null,
  }

  componentDidMount () {
    if (!this.props.isCanvasLoading) {
      this.getCanvasPainters()
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.isCanvasLoading && !this.props.isCanvasLoading) {
      this.getCanvasPainters()
    }
  }

  getCanvasPainters = () => {
    // Get cached canvas painters from Local Storage, but only when cache doesn't have expiration date,
    // which means it was cached when already finished (with all pixels)
    if (this.props.isCanvasFinished) {
      const paintersCache: ?CanvasPaintersCache = LocalStorageManager.canvasPainters.getPaintersCache(this.props.canvasId)
      if (paintersCache) {
        console.log('Painters Cache found')
        const canvasPainters = this.groupPixelsByAddress(paintersCache.canvasPainters)
        return this.setState({ canvasPainters })
      }
    }

    console.log('Downloading Painters from the Blockchain...')

    this.props.Contract.getCanvasPainters(this.props.canvasId)
      .then((paintersByPixel: Array<string>) => {
        const canvasPainters = this.groupPixelsByAddress(paintersByPixel)
        this.setState({ canvasPainters })
        this.updateLocalStorageCache(paintersByPixel)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  updateLocalStorageCache = (paintersByPixel: Array<string>) => {
    // Update canvasPainters cache in Local Storage
    LocalStorageManager.canvasPainters.updatePaintersCache({
      canvasId: this.props.canvasId,
      canvasPainters: paintersByPixel,
    })
  }

  groupPixelsByAddress = (paintersByPixel: Array<string>) => {
    return paintersByPixel.reduce((acc, painterAddress, index) => {
      if (!isAddressNull(painterAddress)) {
        acc[ painterAddress ] = [ ...(acc[ painterAddress ] || []), index ]
      }
      return acc
    }, {})
  }

  getPaintersCount = () => this.state.canvasPainters ? Object.keys(this.state.canvasPainters).length : ''

  showModal = () => {
    const paintersCount = this.getPaintersCount()
    Modal.info({
      title: `${paintersCount} ${paintersCount === 1 ? 'Painter' : 'Painters'} of Canvas #${this.props.canvasId}`,
      width: 600,
      maskClosable: true,
      content: (
        <div>
          <br />
          {this.state.canvasPainters && <CanvasPaintersModal canvasPainters={this.state.canvasPainters} />}
        </div>
      ),
      onOk () {},
    })

  }

  render () {
    const paintersCount = this.getPaintersCount()
    return (
      <div>
        {
          this.state.canvasPainters
            ? <Link to="#" onClick={this.showModal}>
              {paintersCount} Canvas {paintersCount === 1 ? 'Painter' : 'Painters'}
            </Link>
            : <p>&nbsp;</p>
        }
      </div>
    )
  }
}

CanvasPainters = withWeb3(CanvasPainters)
export { CanvasPainters }
