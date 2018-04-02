import React from 'react'
import { cutAddress } from '../../../helpers/strings'
import { Alert, Button, Modal } from 'antd'

const CurrentBuyOffer = (props) => {
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
      <p>
        This Canvas has an active buy offer for: <b>{props.price} ETH</b><br />
        <small>from {cutAddress(props.from)}</small>
      </p>

      {
        props.isUsersOffer &&
        <div>
          <Alert message="Your Buy Offer is the highest" type="success" showIcon />
          <br />
          <Button type="default" size="default" onClick={props.cancelBuyOffer}>Cancel Buy Offer</Button>
          <br /><br />
        </div>
      }

      {
        props.isUserCanvasOwner &&
        <div>
          <Button type="primary" size="default" onClick={confirmAcceptBuyOffer}>
            Sell this Canvas now for {props.price} ETH
          </Button>
          <br /><br />
        </div>
      }
    </div>
  )
}

CurrentBuyOffer.propTypes = {}
CurrentBuyOffer.defaultProps = {}

export default CurrentBuyOffer
