import React from 'react'
import { cutAddress } from '../../../helpers/strings'
import { URLHelper } from '../../../helpers/URLhelper'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'

const BuyOfferInfo = ({ price, from }) => (
  <p>
    <Icon type="shopping-cart" /> There is an active Buy Offer for: <b className="text-nowrap">{price} ETH</b><br />
    <small>from <Link to={URLHelper.account(from)}>{cutAddress(from)}</Link></small>
  </p>
)

const NoActiveOffer = () => (
  <p><Icon type="shopping-cart" /> There are no active Buy Offers.</p>
)

const CurrentBuyOffer = (props) => (
  props.hasOffer
    ? <BuyOfferInfo {...props} />
    : <NoActiveOffer />
)

CurrentBuyOffer.propTypes = {}
CurrentBuyOffer.defaultProps = {}

export default CurrentBuyOffer
