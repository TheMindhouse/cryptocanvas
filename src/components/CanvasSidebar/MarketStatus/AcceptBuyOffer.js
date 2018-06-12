import React from 'react'
import { Button, Modal } from 'antd'
import { PendingTransactionInfo } from '../../Small/PendingTransactionInfo'
import { TRANSACTION_TYPE } from '../../../models/Transaction'
import { TermsInfo } from '../../Small/TermsInfo'
import { CONFIG } from '../../../config'

const AcceptBuyOffer = (props) => {
  const getNetValue = () => parseFloat(props.price * (1 - CONFIG.COMMISSION - CONFIG.PAINTERS_REWARD)).toFixed(2)

  const confirmAcceptBuyOffer = () => {
    Modal.confirm({
      title: `Do you want to sell Canvas #${props.canvasId}?`,
      content: (
        <div>
          <p className="text-smaller">
            Buy Offer includes {CONFIG.COMMISSION * 100}% commission
            and {CONFIG.PAINTERS_REWARD * 100}% reward for painters.
          </p>
          <span className="text-smaller">You will receive:</span>
          <h2>
            <b>{ getNetValue() } ETH </b>
          </h2>
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
