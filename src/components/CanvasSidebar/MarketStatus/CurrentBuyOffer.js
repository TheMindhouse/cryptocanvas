import React from 'react'
import { cutAddress } from '../../../helpers/strings'

const BuyOfferInfo = ({ price, from }) => (
  <p>
    There is an active Buy Offer for: <b>{price} ETH</b><br />
    <small>from {cutAddress(from)}</small>
  </p>
)

const NoActiveOffer = () => (
  <p>There are no active Buy Offers.</p>
)

const CurrentBuyOffer = (props) => (
  props.hasOffer
    ? <BuyOfferInfo {...props} />
    : <NoActiveOffer />
)

CurrentBuyOffer.propTypes = {}
CurrentBuyOffer.defaultProps = {}

export default CurrentBuyOffer
