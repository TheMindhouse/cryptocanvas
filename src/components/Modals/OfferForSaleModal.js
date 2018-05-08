import React from 'react'
import { Input, Modal } from 'antd'
import { TermsInfo } from '../Small/TermsInfo'

class OfferForSaleModal extends React.PureComponent {
  state = {
    offerValue: null,
    receiverAddress: null,
  }

  update = (event) => {
    this.setState({ offerValue: event.currentTarget.value })
  }

  setReceiver = (event) => {
    const receiverAddress = event.currentTarget.value || null
    this.setState({ receiverAddress })
  }

  onSubmitSellOffer = () => {
    const {
      offerValue,
      receiverAddress,
    } = this.state
    this.props.onModalSubmit({ offerValue, receiverAddress })
  }

  render () {
    return (
      <Modal
        title="Offer Canvas for sale"
        visible={this.props.modal.isVisible}
        onOk={this.onSubmitSellOffer}
        onCancel={this.props.modal.close}
        okText="Submit Sell Offer"
      >
        <p>
          As the Owner of this Canvas you can offer it for sale. If anyone accepts the offer and sends Ether,
          the Canvas ownership will be transferred automatically.
        </p>
        <Input type="text" addonAfter="ETH"
               placeholder="Enter your Sell Offer"
               onChange={this.update}
               onPressEnter={this.onSubmitSellOffer}
        />
        <br /><br />
        <small>You can restrict this offer to a specific address</small>
        <Input type="text"
               placeholder="(optional) Receiver's address"
               onChange={this.setReceiver} />
        <TermsInfo />
      </Modal>
    )
  }
}

OfferForSaleModal.propTypes = {}
OfferForSaleModal.defaultProps = {}

export default OfferForSaleModal
