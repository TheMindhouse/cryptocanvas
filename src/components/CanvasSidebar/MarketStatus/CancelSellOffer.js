import React from 'react'
import { Button, Modal } from 'antd'

const CancelSellOffer = (props) => {
  const confirm = () => {
    Modal.confirm({
      title: 'Remove Sell Offer?',
      content: <span>Do you want to remove your Sell Offer for this Canvas? Other users will still be able to submit their Buy Offers.</span>,
      okText: 'Remove Offer',
      okType: 'primary',
      onOk: props.cancelSellOffer,
    })
  }

  return (
    <Button type="default" size="default" onClick={confirm}>
      Remove Sell Offer
    </Button>
  )
}

CancelSellOffer.propTypes = {}
CancelSellOffer.defaultProps = {}

export default CancelSellOffer
