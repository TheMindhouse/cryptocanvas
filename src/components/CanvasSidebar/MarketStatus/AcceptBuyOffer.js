import React from 'react'
import { Button, Modal } from 'antd'
import { PendingTransactionInfo } from '../../Small/PendingTransactionInfo'
import { TRANSACTION_TYPE } from '../../../models/Transaction'

const AcceptBuyOffer = (props) => {
  const confirmAcceptBuyOffer = () => {
    Modal.confirm({
      title: 'Confirm Canvas Sale',
      content: <span>Do you want to sell this Canvas for <b>{props.price} ETH?</b></span>,
      okText: 'Yes, sell this Canvas',
      okType: 'primary',
      onOk: () => props.acceptBuyOffer(props.price),
    })
  }

  return (
    <div>
      <Button type="primary" size="default" onClick={confirmAcceptBuyOffer}>
        Sell this Canvas now for {props.price} ETH
      </Button>
      <PendingTransactionInfo type={TRANSACTION_TYPE.acceptBuyOffer} canvasId={props.canvasId}/>
      <br /><br />
    </div>
  )
}

AcceptBuyOffer.propTypes = {}
AcceptBuyOffer.defaultProps = {}

export default AcceptBuyOffer
