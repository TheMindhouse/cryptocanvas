// @flow
import * as React from 'react'
import { withSelectedPixels } from '../../hoc/withSelectedPixels'
import { Alert, Button } from 'antd'
import { TermsInfo } from '../Small/TermsInfo'
import type { SelectedPixelsProviderState } from '../../stores/SelectedPixelsProvider'
import withWeb3 from '../../hoc/withWeb3'
import { ContractModel } from '../../models/ContractModel'
import { SelectedPixel } from '../../models/SelectedPixel'
import { LocalStorageManager } from '../../localStorage'
import { message, Modal } from 'antd/lib/index'
import { withAnalytics } from '../../hoc/withAnalytics'
import { WithAnalytics } from '../../types/WithAnalytics'
import { HashLink } from 'react-router-hash-link'
import { URLHelper } from '../../helpers/URLhelper'
import { gasCalculator } from '../../helpers/gasCalculator'
import { ANALYTICS_ACTIONS, ANALYTICS_EVENTS } from '../../constants/analytics'
import * as pluralize from 'pluralize'

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

  submitPixels = () => {
    const { canvasId } = this.props
    const selectedPixels = this.props.selectedPixelsStore.getSelectedPixels(this.props.canvasId)
    const pixelIndexes = selectedPixels.map((pixel: SelectedPixel) => pixel.pixelIndex)
    const colorIds = selectedPixels.map((pixel: SelectedPixel) => pixel.colorId)
    const gasLimit = gasCalculator.setPixels(selectedPixels.length, this.props.isCanvasEmpty)
    this.props.Contract.setPixels({ canvasId, pixelIndexes, colorIds, gasLimit })
      .then((tx) => {
        selectedPixels.forEach((pixel: SelectedPixel) => this.props.selectedPixelsStore.removeSelectedPixel(pixel))
        LocalStorageManager.transactions.updateTransactions(tx)
        message.success('Paint Pixels Transaction sent')
        this.props.analyticsAPI.event({
          category: ANALYTICS_EVENTS.painting,
          action: ANALYTICS_ACTIONS.painting.paintPixelsSubmit,
          label: `Canvas #${this.props.canvasId}, ${selectedPixels.length} ${pluralize('pixel', selectedPixels.length)}`,
        })
      })
      .catch((error) => {
        console.error(error)
        Modal.error({
          title: 'Could not paint pixels',
          content: 'You either rejected the transaction in MetaMask or another error occurred.',
        })
        this.props.analyticsAPI.event({
          category: ANALYTICS_EVENTS.painting,
          action: ANALYTICS_ACTIONS.painting.paintPixelsFailed,
          label: `Canvas #${this.props.canvasId}, ${selectedPixels.length} ${pluralize('pixel', selectedPixels.length)}`,
        })
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
        <Button type="primary" size="large" disabled={!selectedPixels.length} onClick={this.submitPixels}>
          Submit to the blockchain
        </Button>
        <TermsInfo style={{ marginTop: 10 }} />
      </div>
    )
  }
}

SubmitSelectedPixels = withAnalytics(withWeb3(withSelectedPixels(SubmitSelectedPixels)))
export { SubmitSelectedPixels }
