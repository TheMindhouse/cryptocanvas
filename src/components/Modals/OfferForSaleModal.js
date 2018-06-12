import React from 'react'
import { Input, Modal } from 'antd'
import { TermsInfo } from '../Small/TermsInfo'
import { CONFIG } from '../../config'

class OfferForSaleModal extends React.PureComponent {
  state = {
    offerValue: null,
    receiverAddress: null,
  }

  update = (event) => {
    const offerValue = event.currentTarget.value >= 0 ? event.currentTarget.value : 0
    this.setState({ offerValue })
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

  getNetValue = () => {
    return parseFloat(this.state.offerValue * (1 - CONFIG.COMMISSION - CONFIG.PAINTERS_REWARD)).toFixed(2)
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
        <Input type="number" addonAfter="ETH"
               min={0}
               placeholder="Enter your Sell Offer"
               onChange={this.update}
               onPressEnter={this.onSubmitSellOffer}
        />
        <p className="text-smaller" style={{ marginTop: 8 }}>
          Incl. {CONFIG.COMMISSION * 100}% commission and {CONFIG.PAINTERS_REWARD * 100}% reward for painters
        </p>
        <span className="text-smaller">When sold, you will receive:</span>
        <h3>
          <b>{ this.getNetValue() } ETH </b>
        </h3>
        <span className="text-smaller">You can restrict this offer to a specific address</span>
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
