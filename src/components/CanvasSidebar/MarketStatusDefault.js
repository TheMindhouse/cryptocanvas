import React from 'react'
import withWeb3 from '../../hoc/withWeb3'
import CurrentBuyOffer from './MarketStatus/CurrentBuyOffer'
import CurrentSellOffer from './MarketStatus/CurrentSellOffer'
import AcceptSellOffer from './MarketStatus/AcceptSellOffer'
import BuyOfferActions from './MarketStatus/BuyOfferActions'

const IS_OWNER = false

const MarketStatusDefault = (props) => {
  return (
    <div>
      <h2>Market Status</h2>
      <CurrentSellOffer
        isForSale={props.currentSellOffer.isForSale}
        price={props.web3.fromWei(props.currentSellOffer.price)}
        offerReceiver={props.currentSellOffer.onlySellTo}
        isUserOfferReceiver={props.currentSellOffer.onlySellTo === props.userAddress}
        isUserCanvasOwner={IS_OWNER}
      />

      {
        props.currentSellOffer.isForSale &&
        <AcceptSellOffer
          offerReceiver={props.currentSellOffer.onlySellTo}
          isUserOfferReceiver={props.currentSellOffer.onlySellTo === props.userAddress}
          price={props.web3.fromWei(props.currentSellOffer.price)}
          acceptSellOffer={props.acceptSellOffer}
        />
      }

      <CurrentBuyOffer
        hasOffer={props.currentBuyOffer.hasOffer}
        price={props.web3.fromWei(props.currentBuyOffer.price)}
        from={props.currentBuyOffer.buyer}
        isUsersOffer={props.currentBuyOffer.buyer === props.userAddress}
        acceptBuyOffer={props.acceptBuyOffer}
      />

      <BuyOfferActions
        hasOffer={props.currentBuyOffer.hasOffer}
        isUsersOffer={props.currentBuyOffer.buyer === props.userAddress}
        submitBuyOffer={props.submitBuyOffer}
        cancelBuyOffer={props.cancelBuyOffer}
      />

    </div>
  )
}

MarketStatusDefault.propTypes = {}
MarketStatusDefault.defaultProps = {}

export default withWeb3(MarketStatusDefault)
