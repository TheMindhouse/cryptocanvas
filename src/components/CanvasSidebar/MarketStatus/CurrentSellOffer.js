import React from 'react'
import { cutAddress } from '../../../helpers/strings'

const NoOffer = () => (
  <p>The owner hasn't submitted any Sell Offer yet.</p>
)

const OfferInfoDefault = ({ price }) => (
  <p>
    This Canvas is offered for sale for: <b>{price} ETH</b>
  </p>
)

const OfferInfoToAddress = ({ price, offerReceiver }) => (
  <p>
    This Canvas is offered for sale to address <b>{cutAddress(offerReceiver)}</b> for: <b>{price} ETH</b>
  </p>
)

const CurrentSellOffer = (props) => (
  !props.isForSale
    ? <NoOffer />
    : props.offerReceiver
      ? <OfferInfoToAddress {...props} />
      : <OfferInfoDefault {...props} />
)

CurrentSellOffer.propTypes = {}
CurrentSellOffer.defaultProps = {}

export default CurrentSellOffer
