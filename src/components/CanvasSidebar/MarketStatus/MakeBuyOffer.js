import React from 'react'
import { Button} from 'antd'
import withModal from '../../../hoc/withModal'
import MakeBuyOfferModal from '../../Modals/MakeBuyOfferModal'

class MakeBuyOffer extends React.PureComponent {
  onModalSubmit = (offerValue) => {
    this.props.submitOffer(offerValue)
    this.props.modal.close()
  }

  render () {
    return (
      <div>
        <MakeBuyOfferModal
          modal={this.props.modal}
          onModalSubmit={this.onModalSubmit}
          />
        <Button type="primary" onClick={this.props.modal.show}>{ this.props.isEdit ? "Edit Buy Offer" : "Make Buy Offer" }</Button>
      </div>
    )
  }
}

MakeBuyOffer.propTypes = {}
MakeBuyOffer.defaultProps = {}

export default withModal(MakeBuyOffer)
