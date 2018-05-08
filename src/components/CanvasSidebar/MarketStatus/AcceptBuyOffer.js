import React from 'react'
import { Button, Modal } from 'antd'
import { PendingTransactionInfo } from '../../Small/PendingTransactionInfo'
import { TRANSACTION_TYPE } from '../../../models/Transaction'
import { TermsInfo } from '../../Small/TermsInfo'

const AcceptBuyOffer = (props) => {
  const confirmAcceptBuyOffer = () => {
    Modal.confirm({
      title: 'Confirm Canvas Sale',
      content: (
        <div>
          <p>Do you want to sell <b className="text-nowrap">Canvas #{props.canvasId}</b> for <b className="text-nowrap">{props.price} ETH?</b></p>
          <TermsInfo />
        </div>
      ),
      okText: 'Sell Canvas',
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
