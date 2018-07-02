// @flow
import * as React from 'react'
import { withSelectedPixels } from '../../hoc/withSelectedPixels'
import type { SelectedPixelsProviderState } from '../../stores/SelectedPixelsProvider'
import { SelectedPixel } from '../../models/SelectedPixel'
import { hexPalette } from '../../helpers/colors'
import './styles/SelectedPixelsInfo.css'
import { Row, Popover, Icon } from 'antd'
import * as pluralize from 'pluralize'
import withModal from '../../hoc/withModal'
import SelectedPixelsModal from '../Modals/SelectedPixelsModal'
import { WithModal } from '../../types/WithModal'
import withWeb3 from '../../hoc/withWeb3'
import { gasCalculator } from '../../helpers/gasCalculator'
import { EthToUsd } from '../Small/EthToUsd'
import { Link } from 'react-router-dom'
import { CONFIG } from "../../config"

type Props = {
  canvasId: number,
  isCanvasEmpty: boolean,
  // withModal
  modal: WithModal,
  // withSelectedPixels
  selectedPixelsStore: SelectedPixelsProviderState,
  // withWeb3
  gasPrice: ?number,
  web3: Object,
}

const COLOR_PREVIEW_LIMIT = 19

class SelectedPixelsInfo extends React.PureComponent<Props> {
  static defaultProps = {}

  calculateEstimatedGasPrice = (selectedPixelsCount: number) => {
    if (this.props.gasPrice) {
      const estimatedGasPriceInWei = this.props.gasPrice * gasCalculator.setPixels(selectedPixelsCount, this.props.isCanvasEmpty)
      return parseFloat(this.props.web3.fromWei(estimatedGasPriceInWei, 'ether'))
    }
    return null
  }

  calculateNumberOfTransactions = (selectedPixelsCount: number): number =>
    Math.ceil(selectedPixelsCount / CONFIG.MAX_PIXELS_IN_BATCH)


  render () {
    const selectedPixels = this.props.selectedPixelsStore.getSelectedPixels(this.props.canvasId)
    const pixelsCutFromPreview = selectedPixels.length - COLOR_PREVIEW_LIMIT

    const estimatedGasPriceInEth = this.calculateEstimatedGasPrice(selectedPixels.length)
    const numberOfTx = this.calculateNumberOfTransactions(selectedPixels.length)

    if (!selectedPixels.length) {
      return <p>Click on a pixel to select</p>
    }

    return (
      <div>
        <SelectedPixelsModal
          modal={this.props.modal}
          selectedPixels={selectedPixels}
          removeSelectedPixel={this.props.selectedPixelsStore.removeSelectedPixel}
        />
        <Row type="flex" align="middle" className="SelectedPixelsPreview">
          {selectedPixels.slice(0, COLOR_PREVIEW_LIMIT).map((pixel: SelectedPixel, i: number) =>
            <div className="SelectedPixelsPreview__Color" key={i}
                 style={{ backgroundColor: hexPalette[ pixel.colorId ] }} />
          )}
          {
            pixelsCutFromPreview > 0 && <span>&bull;&bull;&bull; {pixelsCutFromPreview} more</span>
          }
        </Row>
        <p>
          <Link to="#" onClick={this.props.modal.show}>
            {selectedPixels.length} {pluralize('pixel', selectedPixels.length)} selected
          </Link>
          {
            this.props.gasPrice &&
            <Popover title="Who am I paying for painting?" width={100} content={
              <p style={{ maxWidth: 230 }}>
                <b>This is NOT a fee for us.</b> We don't charge anything for painting.<br /><br />
                This is a fee for miners - computers processing your operation in the Ethereum Network.&nbsp;
                <a href="https://blog.softwaremill.com/ethereum-everything-you-want-to-know-about-the-gas-b7c8f5c17e7c"
                   target="_blank" rel="noopener noreferrer">Read more</a>
              </p>
            }>
              <span>&nbsp;(max. <EthToUsd eth={estimatedGasPriceInEth} /> <Icon type="question-circle" />)</span>
            </Popover>
          }
          {
            numberOfTx > 1 &&
            <small style={{ margin: 0, display: 'block' }}>
              (sending in {numberOfTx} transactions)
            </small>
          }
        </p>
      </div>
    )
  }
}

SelectedPixelsInfo = withWeb3(withModal(withSelectedPixels(SelectedPixelsInfo)))
export { SelectedPixelsInfo }
