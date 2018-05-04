import React from 'react'
import { cutAddress } from '../../../helpers/strings'
import { URLHelper } from '../../../helpers/URLhelper'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'

const NoOffer = () => (
  <p><Icon type="tag" /> The owner hasn't submitted any Sell Offer yet.</p>
)

const OfferInfoDefault = ({ price }) => (
  <p>
    <Icon type="tag" /> This Canvas is offered for sale for: <b>{price} ETH</b>
  </p>
)

const OfferInfoToAddress = ({ price, offerReceiver }) => (
  <p>
    <Icon type="tag" /> This Canvas is offered for sale to address <Link to={URLHelper.account(offerReceiver)}>
    <b>{cutAddress(offerReceiver)}</b></Link> for: <b>{price} ETH</b>
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
