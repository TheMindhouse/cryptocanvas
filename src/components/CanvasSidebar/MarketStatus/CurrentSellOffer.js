import React from 'react'
import { Button, Modal } from 'antd'
import { cutAddress } from '../../../helpers/strings'

const CurrentSellOffer = (props) => {
  const confirmAcceptSellOffer = () => {
    Modal.confirm({
      title: 'Confirm Canvas Buy',
      content: <span>Do you want to buy this Canvas for <b>{props.price} ETH?</b></span>,
      okText: 'Yes, buy this Canvas',
      okType: 'primary',
      onOk: () => props.acceptSellOffer(props.price),
    })
  }

  return (
    <div>
      {
        !props.offerReceiver &&
        <p>
          This Canvas is offered for sale for: <b>{props.price} ETH</b>
        </p>
      }
      {
        props.offerReceiver &&
        <p>
          This Canvas is offered for sale to address <b>{cutAddress(props.offerReceiver)}</b> for: <b>{props.price} ETH</b>
        </p>
      }

      {
        !props.isUserCanvasOwner &&
        (!props.offerReceiver || (props.offerReceiver && props.isUserOfferReceiver)) &&
        <div>
          <Button type="primary" size="default" onClick={confirmAcceptSellOffer}>
            Buy this Canvas for {props.price} ETH
          </Button>
          <br /><br />
        </div>
      }
    </div>
  )
}

CurrentSellOffer.propTypes = {}
CurrentSellOffer.defaultProps = {}

export default CurrentSellOffer
