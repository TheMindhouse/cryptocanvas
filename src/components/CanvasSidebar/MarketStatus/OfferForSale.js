import React from 'react'
import { Button } from 'antd'
import withModal from '../../../hoc/withModal'
import OfferForSaleModal from '../../Modals/OfferForSaleModal'

class OfferForSale extends React.PureComponent {
  onModalSubmit = ({ offerValue, receiverAddress = null } = {}) => {
    if (receiverAddress) {
      this.props.submitSellOfferToAddress(offerValue, receiverAddress)
    } else {
      this.props.submitSellOffer(offerValue)
    }
    this.props.modal.close()
  }

  render () {
    return (
      <div>
        <OfferForSaleModal
          modal={this.props.modal}
          onModalSubmit={this.onModalSubmit}
        />
        <Button type="primary" onClick={this.props.modal.show}>
          {this.props.isEdit ? 'Edit Sell Offer' : 'Offer For Sale'}
        </Button>
      </div>
    )
  }
}

OfferForSale.propTypes = {}
OfferForSale.defaultProps = {}

export default withModal(OfferForSale)
