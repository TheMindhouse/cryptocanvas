import React from 'react'
import { Button, Input } from 'antd'

class MakeBuyOffer extends React.PureComponent {
  state = {
    offer: null
  }

  update = (event) => {
    this.setState({ offer: event.currentTarget.value })
  }

  onSubmitOffer = () => {
    this.props.submitOffer(this.state.offer)
  }

  render() {
    return (
      <div>
        <p>You can make a Buy Offer for this Canvas. If the owner accepts it,
          the Canvas ownership will be transferred to you automatically.</p>
        <Input type="text" addonAfter="ETH"
               placeholder="Enter your Buy Offer"
               onChange={this.update}
               onPressEnter={this.onSubmitOffer} />
        <p />
        <Button type="primary" onClick={this.onSubmitOffer}>Submit Buy Offer</Button>
      </div>
    );
  }
}

MakeBuyOffer.propTypes = {}
MakeBuyOffer.defaultProps = {}

export default MakeBuyOffer
