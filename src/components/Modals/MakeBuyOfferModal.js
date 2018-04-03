import React from 'react'
import { Input, Modal } from 'antd'

class MakeBuyOfferModal extends React.PureComponent {
  state = {
    offerValue: null
  }

  update = (event) => {
    this.setState({ offerValue: event.currentTarget.value })
  }

  onSubmitOffer = () => this.props.onModalSubmit(this.state.offerValue)

  render () {
    return (
      <Modal
        title="Make Buy Offer"
        visible={this.props.modal.isVisible}
        onOk={this.onSubmitOffer}
        onCancel={this.props.modal.close}
        okText="Submit Buy Offer"
      >
        <p>You can make a Buy Offer for this Canvas. If the owner accepts it,
          the Canvas ownership will be transferred to you automatically.</p>
        <Input type="text" addonAfter="ETH"
               placeholder="Enter your Buy Offer"
               onChange={this.update}
               onPressEnter={this.onSubmitOffer} />
        <p />
      </Modal>
    )
  }
}

MakeBuyOfferModal.propTypes = {}
MakeBuyOfferModal.defaultProps = {}

export default MakeBuyOfferModal
