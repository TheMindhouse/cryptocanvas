import React from 'react'
import { Button, Modal } from 'antd'

const CancelBuyOffer = (props) => {
  const confirm = () => {
    Modal.confirm({
      title: 'Remove Buy Offer?',
      content: <span>Do you want to remove your Buy Offer for this Canvas?</span>,
      okText: 'Remove Offer',
      okType: 'primary',
      onOk: props.cancelBuyOffer,
    })
  }

  return (
    <Button type="default" size="default" onClick={confirm}>Cancel Buy Offer</Button>
  )
}

CancelBuyOffer.propTypes = {}
CancelBuyOffer.defaultProps = {}

export default CancelBuyOffer
