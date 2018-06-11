import React from 'react'
import { Divider, message } from 'antd'
import CurrentOwner from './CurrentOwner'
import MarketStatus from './MarketStatus'
import withWeb3 from '../../hoc/withWeb3'
import withEvents from '../../hoc/withEvents'
import { LocalStorageManager } from '../../localStorage'
import { CanvasPainters } from './CanvasPainters'
import { SetCanvasName } from './SetCanvasName'
import PainterRewardCore from '../../hoc/renderProps/PainterRewardCore'
import SidebarRewardInfo from './PainterReward/SidebarRewardInfo'

class CanvasSidebarTrading extends React.PureComponent {
  constructor () {
    super()
    this.state = {
      currentBuyOffer: {},
      currentSellOffer: {},
    }
  }

  componentDidMount () {
    this.getCurrentBuyOffer()
    this.getCurrentSellOffer()

    if (this.props.eventsSupported) {
      this.props.getBlockNumber().then(this.watchForChanges)
    }
  }

  getCurrentBuyOffer = () => {
    this.props.Contract.getCurrentBuyOffer(this.props.canvasId)
      .then(currentBuyOffer => {
        console.log(currentBuyOffer)
        return this.setState({ currentBuyOffer })
      })
  }

  getCurrentSellOffer = () => {
    this.props.Contract.getCurrentSellOffer(this.props.canvasId)
      .then(currentSellOffer => {
        console.log(currentSellOffer)
        return this.setState({ currentSellOffer })
      })
  }

  watchForChanges = (blockNumber) => {
    const options = [ { _canvasId: this.props.canvasId }, { fromBlock: blockNumber, toBlock: 'latest' } ]

    const buyOfferMadeEvent = this.props.Contract.BuyOfferMadeEvent(...options)
    const buyOfferCancelledEvent = this.props.Contract.BuyOfferCancelledEvent(...options)
    const sellOfferMadeEvent = this.props.Contract.SellOfferMadeEvent(...options)
    const sellOfferCancelledEvent = this.props.Contract.SellOfferCancelledEvent(...options)
    const canvasSoldEvent = this.props.Contract.CanvasSoldEvent(...options)

    buyOfferMadeEvent.watch(this.getCurrentBuyOffer)
    buyOfferCancelledEvent.watch(this.getCurrentBuyOffer)
    sellOfferMadeEvent.watch(this.getCurrentSellOffer)
    sellOfferCancelledEvent.watch(this.getCurrentSellOffer)
    canvasSoldEvent.watch(() => {
      this.getCurrentSellOffer()
      this.getCurrentBuyOffer()
      this.props.onCanvasSold()
    })

    this.props.addEvents([
      buyOfferMadeEvent,
      buyOfferCancelledEvent,
      sellOfferMadeEvent,
      sellOfferCancelledEvent,
      canvasSoldEvent,
    ])
  }

  submitSellOffer = (offerInEth) => {
    const offerInWei = this.props.web3.toWei(offerInEth, 'ether')
    console.log(`[USER] New sell offer: ${offerInWei} WEI (${offerInEth} ETH)`)
    this.props.Contract.offerForSale(this.props.canvasId, offerInWei)
      .then(transaction => {
        LocalStorageManager.transactions.updateTransactions(transaction)
        message.success('Offer Canvas for Sale Transaction sent')
      })
  }

  submitSellOfferToAddress = (offerInEth, receiverAddress) => {
    const offerInWei = this.props.web3.toWei(offerInEth, 'ether')
    console.log(`[USER] New sell offer: ${offerInWei} WEI (${offerInEth} ETH)`)
    this.props.Contract.offerForSaleToAddress(this.props.canvasId, offerInWei, receiverAddress)
      .then(transaction => {
        LocalStorageManager.transactions.updateTransactions(transaction)
        message.success('Offer Canvas for Sale to Address Transaction sent')
      })
  }

  cancelSellOffer = () => {
    this.props.Contract.cancelSellOffer(this.props.canvasId)
      .then(transaction => {
        LocalStorageManager.transactions.updateTransactions(transaction)
        message.success('Cancel Sell Offer Transaction sent')
      })
  }

  submitBuyOffer = (offerInEth) => {
    const offerInWei = this.props.web3.toWei(offerInEth, 'ether')
    console.log(`[USER] New buy offer: ${offerInWei} WEI (${offerInEth} ETH)`)
    this.props.Contract.makeBuyOffer(this.props.canvasId, offerInWei)
      .then(transaction => {
        LocalStorageManager.transactions.updateTransactions(transaction)
        message.success('Make Buy Offer Transaction sent')

      })
  }

  cancelBuyOffer = () => {
    this.props.Contract.cancelBuyOffer(this.props.canvasId)
      .then(transaction => {
        LocalStorageManager.transactions.updateTransactions(transaction)
        message.success('Cancel Buy Offer Transaction sent')
      })
  }

  acceptBuyOffer = (priceInEth) => {
    // const priceInWei = this.props.web3.toWei(priceInEth, 'ether')
    const priceInWei = this.props.web3.toWei(0, 'ether')
    this.props.Contract.acceptBuyOffer(this.props.canvasId, priceInWei)
      .then(transaction => {
        LocalStorageManager.transactions.updateTransactions(transaction)
        message.success('Sell Canvas Transaction sent')
      })
  }

  acceptSellOffer = (priceInEth) => {
    const priceInWei = this.props.web3.toWei(priceInEth, 'ether')
    this.props.Contract.acceptSellOffer(this.props.canvasId, priceInWei)
      .then(transaction => {
        LocalStorageManager.transactions.updateTransactions(transaction)
        message.success('Buy Canvas Transaction sent')
      })
  }

  render () {
    const canvasOwner = this.props.canvasInfo.owner
    const isUserCanvasOwner = this.props.account === canvasOwner
    const canvasName = this.props.canvasInfo.name || `Canvas #${this.props.canvasId}`

    return (
      <div className="CanvasSidebar">
        <h2 className="CanvasSidebar__title">{canvasName}</h2>
        <h3 className="CanvasSidebar__status">Completed</h3>

        <CanvasPainters
          canvasId={this.props.canvasId}
          isCanvasLoading={this.props.isCanvasLoading}
          isCanvasFinished={true}
        />

        <Divider />

        <CurrentOwner
          canvasOwner={canvasOwner}
          isUserCanvasOwner={isUserCanvasOwner}
        />

        {
          isUserCanvasOwner &&
          <div>
            <br />
            <SetCanvasName canvasId={this.props.canvasId} />
          </div>
        }

        <Divider />

        <MarketStatus
          userAddress={this.props.account}
          canvasId={this.props.canvasId}
          isUserCanvasOwner={isUserCanvasOwner}
          currentBuyOffer={this.state.currentBuyOffer}
          currentSellOffer={this.state.currentSellOffer}
          submitBuyOffer={this.submitBuyOffer}
          submitSellOffer={this.submitSellOffer}
          submitSellOfferToAddress={this.submitSellOfferToAddress}
          cancelBuyOffer={this.cancelBuyOffer}
          cancelSellOffer={this.cancelSellOffer}
          acceptBuyOffer={this.acceptBuyOffer}
          acceptSellOffer={this.acceptSellOffer}
        />

        <Divider />

        {
          this.props.account &&
          <PainterRewardCore
            canvasId={this.props.canvasId}
            render={(state) => <SidebarRewardInfo {...state} canvasId={this.props.canvasId}/>
            }
          />
        }

      </div>
    )
  }
}

CanvasSidebarTrading.propTypes = {}
CanvasSidebarTrading.defaultProps = {}

export default withEvents(withWeb3(CanvasSidebarTrading))
