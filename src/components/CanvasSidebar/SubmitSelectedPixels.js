// @flow
import * as React from 'react'
import { withSelectedPixels } from '../../hoc/withSelectedPixels'
import { Alert, Button, notification, message, Modal } from 'antd'
import { TermsInfo } from '../Small/TermsInfo'
import type { SelectedPixelsProviderState } from '../../stores/SelectedPixelsProvider'
import withWeb3 from '../../hoc/withWeb3'
import { ContractModel } from '../../models/ContractModel'
import { SelectedPixel } from '../../models/SelectedPixel'
import { LocalStorageManager } from '../../localStorage'
import { withAnalytics } from '../../hoc/withAnalytics'
import { WithAnalytics } from '../../types/WithAnalytics'
import { HashLink } from 'react-router-hash-link'
import { URLHelper } from '../../helpers/URLhelper'
import { gasCalculator } from '../../helpers/gasCalculator'
import { ANALYTICS_ACTIONS, ANALYTICS_EVENTS } from '../../constants/analytics'
import * as pluralize from 'pluralize'
import { CONFIG } from "../../config"
import { chunkArray } from "../../helpers/utils"

type Props = {
  canvasId: number,
  totalPixels: number,
  isSubmitAllowed: boolean,
  isCanvasEmpty: boolean,
  // withSelectedPixels
  selectedPixelsStore: SelectedPixelsProviderState,
  // withWeb3
  Contract: ContractModel,
  // withAnalytics
  analyticsAPI: WithAnalytics,
}

class SubmitSelectedPixels extends React.PureComponent<Props> {
  static defaultProps = {}

  onSubmitPixels = () => {
    const selectedPixels = this.props.selectedPixelsStore.getSelectedPixels(this.props.canvasId)
    const selectedPixelsBatches = chunkArray(selectedPixels, CONFIG.MAX_PIXELS_IN_BATCH)
    const pBatchesSent = selectedPixelsBatches.map((pixelsBatch: Array<SelectedPixel>) =>
      this.submitPixelsBatch(pixelsBatch)
    )
    Promise.all(pBatchesSent)
      .then(() => {
        notification.success({
          message: 'All pixels submitted',
          description: 'You have successfully submitted all selected pixels to the blockchain.',
          duration: 0,
        })
      })
      .catch((error) => {
        console.error(error)
        Modal.error({
          title: 'Failed to submit pixels',
          content: 'You either rejected the transaction in MetaMask or another error occurred.',
        })
      })
  }


  submitPixelsBatch = (selectedPixelsBatch: Array<SelectedPixel>) => {
    const { canvasId } = this.props
    const pixelIndexes = selectedPixelsBatch.map((pixel: SelectedPixel) => pixel.pixelIndex)
    const colorIds = selectedPixelsBatch.map((pixel: SelectedPixel) => pixel.colorId)
    const gasLimit = gasCalculator.setPixels(selectedPixelsBatch.length, this.props.isCanvasEmpty)
    return this.props.Contract.setPixels({ canvasId, pixelIndexes, colorIds, gasLimit })
      .then((tx) => {
        selectedPixelsBatch.forEach((pixel: SelectedPixel) => this.props.selectedPixelsStore.removeSelectedPixel(pixel))
        LocalStorageManager.transactions.updateTransactions(tx)
        message.success('Paint Pixels Transaction sent')
        this.props.analyticsAPI.event({
          category: ANALYTICS_EVENTS.painting,
          action: ANALYTICS_ACTIONS.painting.paintPixelsSubmit,
          label: `Canvas #${this.props.canvasId}, ${selectedPixelsBatch.length} ${pluralize('pixel', selectedPixelsBatch.length)}`,
        })
      })
      .catch((error) => {
        this.props.analyticsAPI.event({
          category: ANALYTICS_EVENTS.painting,
          action: ANALYTICS_ACTIONS.painting.paintPixelsFailed,
          label: `Canvas #${this.props.canvasId}, ${selectedPixelsBatch.length} ${pluralize('pixel', selectedPixelsBatch.length)}`,
        })
        return Promise.reject(error)
      })
  }

  render () {
    if (!this.props.isSubmitAllowed) {
      return (
        <div>
          <Alert type="error" showIcon
                 message={(
                   <span>
                     <b>Enable MetaMask to submit pixels.</b><br/>
                      <HashLink to={URLHelper.help.installingMetamask}>
                        Help: How to enable MetaMask
                      </HashLink>
                   </span>
                 )} />
          <br />
          <Button type="primary" size="large" disabled>
            Submit to the blockchain
          </Button>
        </div>
      )
    }

    const selectedPixels = this.props.selectedPixelsStore.getSelectedPixels(this.props.canvasId)
    return (
      <div>
        <Button type="primary" size="large" disabled={!selectedPixels.length} onClick={this.onSubmitPixels}>
          Submit to the blockchain
        </Button>
        <TermsInfo style={{ marginTop: 10 }} />
      </div>
    )
  }
}

SubmitSelectedPixels = withAnalytics(withWeb3(withSelectedPixels(SubmitSelectedPixels)))
export { SubmitSelectedPixels }
