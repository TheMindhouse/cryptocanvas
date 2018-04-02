import React from 'react'
import OfferForSale from './MarketStatus/OfferForSale'
import MakeBuyOffer from './MarketStatus/MakeBuyOffer'
import CurrentBuyOffer from './MarketStatus/CurrentBuyOffer'
import CurrentSellOffer from './MarketStatus/CurrentSellOffer'

const MarketStatus = (props) => {
  return (
    <div>
      <h2>Market Status</h2>
      {props.currentBuyOffer.hasOffer &&
      <CurrentBuyOffer
        price={props.fromWei(props.currentBuyOffer.price)}
        from={props.currentBuyOffer.buyer}
        isUsersOffer={props.currentBuyOffer.buyer === props.userAddress}
        isUserCanvasOwner={props.isUserCanvasOwner}
        acceptBuyOffer={props.acceptBuyOffer}
        cancelBuyOffer={props.cancelBuyOffer}
      />
      }
      {!props.currentBuyOffer.hasOffer &&
      <p>There are no active Buy Offers.</p>
      }

      {
        props.currentSellOffer.isForSale &&
        <CurrentSellOffer
          price={props.fromWei(props.currentSellOffer.price)}
          offerReceiver={props.currentSellOffer.onlySellTo}
          isUserOfferReceiver={props.currentSellOffer.onlySellTo === props.userAddress}
          isUserCanvasOwner={props.isUserCanvasOwner}
          acceptSellOffer={props.acceptSellOffer}
        />
      }

      {
        !props.isUserCanvasOwner && !props.currentSellOffer.isForSale &&
        <p>The owner hasn't submitted any Sell Offer yet.</p>
      }

      {
        props.isUserCanvasOwner &&
        <OfferForSale
          submitSellOffer={props.submitSellOffer}
          submitSellOfferToAddress={props.submitSellOfferToAddress}
        />
      }
      {!props.isUserCanvasOwner && <MakeBuyOffer submitOffer={props.submitBuyOffer} />}
    </div>
  )
}

MarketStatus.propTypes = {}
MarketStatus.defaultProps = {}

export default MarketStatus
