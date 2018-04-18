import React from 'react'
import CurrentSellOffer from './MarketStatus/CurrentSellOffer'
import CurrentBuyOffer from './MarketStatus/CurrentBuyOffer'
import withWeb3 from '../../hoc/withWeb3'
import AcceptBuyOffer from './MarketStatus/AcceptBuyOffer'
import SellOfferActions from './MarketStatus/SellOfferActions'
import { Divider } from 'antd'

const IS_OWNER = true

const MarketStatusOwner = (props) => {
  return (
    <div>
      <h2><b>Market Status</b></h2>
      <CurrentSellOffer
        isForSale={props.currentSellOffer.isForSale}
        price={props.web3.fromWei(props.currentSellOffer.price)}
        offerReceiver={props.currentSellOffer.onlySellTo}
        isUserOfferReceiver={props.currentSellOffer.onlySellTo === props.userAddress}
        isUserCanvasOwner={IS_OWNER}
      />

      <SellOfferActions
        isForSale={props.currentSellOffer.isForSale}
        price={props.web3.fromWei(props.currentSellOffer.price)}
        submitSellOffer={props.submitSellOffer}
        submitSellOfferToAddress={props.submitSellOfferToAddress}
        cancelSellOffer={props.cancelSellOffer}
        />

      <Divider dashed={true} />

      <CurrentBuyOffer
        hasOffer={props.currentBuyOffer.hasOffer}
        price={props.web3.fromWei(props.currentBuyOffer.price)}
        from={props.currentBuyOffer.buyer}
        isUsersOffer={props.currentBuyOffer.buyer === props.userAddress}
      />

      {
        props.currentBuyOffer.hasOffer &&
        <AcceptBuyOffer
          price={props.web3.fromWei(props.currentBuyOffer.price)}
          acceptBuyOffer={props.acceptBuyOffer}
        />
      }

    </div>
  )
}

MarketStatusOwner.propTypes = {}
MarketStatusOwner.defaultProps = {}

export default withWeb3(MarketStatusOwner)
