import React from 'react'
import { Button, Modal } from 'antd'
import { TRANSACTION_TYPE } from '../../../models/Transaction'
import { PendingTransactionInfo } from '../../Small/PendingTransactionInfo'
import { TermsInfo } from '../../Small/TermsInfo'

const AcceptSellOffer = (props) => {
  const confirmAcceptSellOffer = () => {
    Modal.confirm({
      title: 'Confirm Buy Canvas',
      content: (
        <div>
          <p>Do you want to buy <b className="text-nowrap">Canvas #{props.canvasId}</b> for <b className="text-nowrap">{props.price} ETH?</b></p>
          <TermsInfo />
        </div>),
      okText: 'Buy Canvas',
      okType: 'primary',
      onOk: () => props.acceptSellOffer(props.price),
    })
  }

  return (
    (!props.offerReceiver || props.isUserOfferReceiver)
      ? <div>
          <Button type="primary" size="default" onClick={confirmAcceptSellOffer}>
            Buy this Canvas now for {props.price} ETH
          </Button>
          <PendingTransactionInfo type={TRANSACTION_TYPE.acceptSellOffer} canvasId={props.canvasId}/>
          <br /><br />
        </div>
      : null
  )
}

AcceptSellOffer.propTypes = {}
AcceptSellOffer.defaultProps = {}

export default AcceptSellOffer
