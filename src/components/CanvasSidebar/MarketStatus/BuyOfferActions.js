import React from 'react'
import MakeBuyOffer from './MakeBuyOffer'
import CancelBuyOffer from './CancelBuyOffer'
import { Alert, Row } from 'antd'

const BuyOfferActions = (props) => {
  return (
    <div>
      {
        props.hasOffer && props.isUsersOffer &&
        <div>
          <Alert message="Your Buy Offer is the highest" type="success" showIcon />
          <br />
        </div>
      }

      {
        props.hasOffer && props.isUsersOffer &&
        <Row type="flex" align="space-between">
          <MakeBuyOffer submitOffer={props.submitBuyOffer} isEdit={true} />
          <CancelBuyOffer cancelBuyOffer={props.cancelBuyOffer} />
        </Row>
      }

      {
        (!props.hasOffer || !props.isUsersOffer) &&
        <MakeBuyOffer submitOffer={props.submitBuyOffer} />
      }

    </div>
  )
}

BuyOfferActions.propTypes = {}
BuyOfferActions.defaultProps = {}

export default BuyOfferActions
