import React from 'react'
import OfferForSale from './OfferForSale'
import CancelSellOffer from './CancelSellOffer'
import { Row } from 'antd'

const SellOfferActions = (props) => {
  return (
    <Row type="flex" align="space-between">
      <OfferForSale
        submitSellOffer={props.submitSellOffer}
        submitSellOfferToAddress={props.submitSellOfferToAddress}
        isEdit={props.isForSale}
      />

      {
        props.isForSale &&
        <CancelSellOffer
          cancelSellOffer={props.cancelSellOffer}
        />
      }
    </Row>
  )
}

SellOfferActions.propTypes = {}
SellOfferActions.defaultProps = {}

export default SellOfferActions
