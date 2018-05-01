import React from 'react'
import OfferForSale from './OfferForSale'
import CancelSellOffer from './CancelSellOffer'
import { Row } from 'antd'
import { PendingTransactionInfo } from '../../Small/PendingTransactionInfo'
import { TRANSACTION_TYPE } from '../../../models/Transaction'

const SellOfferActions = (props) => {
  const transactionTypes = [
    TRANSACTION_TYPE.offerForSale,
    TRANSACTION_TYPE.offerForSaleToAddress,
    TRANSACTION_TYPE.cancelSellOffer
  ]

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

      <PendingTransactionInfo type={transactionTypes} canvasId={props.canvasId}/>
    </Row>
  )
}

SellOfferActions.propTypes = {}
SellOfferActions.defaultProps = {}

export default SellOfferActions
