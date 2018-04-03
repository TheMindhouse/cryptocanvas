import React from 'react'
import { Button, Input, Modal } from 'antd'

class OfferForSale extends React.Component {
  state = {
    sellOffer: null,
    modalVisible: false,
    receiver: null,
  }

  showModal = () => this.setState({ modalVisible: true })

  closeModal = () => this.setState({ modalVisible: false })

  update = (event) => {
    this.setState({ sellOffer: event.currentTarget.value })
  }

  setReceiver = (event) => {
    const receiver = event.currentTarget.value || null
    this.setState({ receiver })
  }

  onSubmitSellOffer = () => {
    if (this.state.receiver) {
      this.props.submitSellOfferToAddress(this.state.sellOffer, this.state.receiver)
    } else {
      this.props.submitSellOffer(this.state.sellOffer)
    }
    this.closeModal()
  }

  render () {
    return (
      <div>
        <Modal
          title="Offer Canvas for sale"
          visible={this.state.modalVisible}
          onOk={this.onSubmitSellOffer}
          onCancel={this.closeModal}
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
        </Modal>
        <Button type="primary" onClick={this.showModal}>Offer For Sale</Button>
      </div>
    )
  }
}

OfferForSale.propTypes = {}
OfferForSale.defaultProps = {}

export default OfferForSale
