import React from 'react'
import { Button, Input } from 'antd'

class OfferForSale extends React.PureComponent {
  state = {
    sellOffer: null
  }

  update = (event) => {
    this.setState({ sellOffer: event.currentTarget.value })
  }

  onSubmitSellOffer = () => {
    this.props.submitSellOffer(this.state.sellOffer)
  }

  render () {
    return (
      <div>
        <p>
          You can offer this Canvas for sale. If anyone accepts it and sends Ether,
          the Canvas ownership will be transferred automatically.
        </p>
        <Input type="text" addonAfter="ETH"
               placeholder="Enter your Sell Offer"
               onChange={this.update}
               onPressEnter={this.onSubmitSellOffer} />
        <p />
        <Button type="primary" onClick={this.onSubmitSellOffer}>Offer For Sale</Button>
      </div>
    )
  }
}

OfferForSale.propTypes = {}
OfferForSale.defaultProps = {}

export default OfferForSale
