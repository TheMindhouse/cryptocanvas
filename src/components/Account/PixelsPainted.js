// @flow
import * as React from 'react'
import withWeb3 from '../../hoc/withWeb3'
import { ContractModel } from '../../models/ContractModel'
import { PixelPainted } from '../../models/PixelPainted'
import { Spin } from 'antd'

type Props = {
  // NOT user address, but from the page params!
  accountAddress: string,
  // from withWeb3
  Contract: ContractModel,
  eventsSupported: boolean,
}

type State = {
  paintedPixels: Array<PixelPainted>,
  isLoading: boolean,
}

class PixelsPainted extends React.Component<Props, State> {
  static defaultProps = {}

  state = {
    paintedPixels: [],
    isLoading: this.props.eventsSupported,
  }

  componentDidMount () {
    if (this.props.eventsSupported) {
      this.getPaintedPixels()
    }
  }

  getPaintedPixels = () => {
    if (!this.props.accountAddress) {
      return
    }
    this.props.Contract.PixelPaintedEvent({ painter: this.props.accountAddress }, { fromBlock: 169, toBlock: 'latest' })
      .get((error, result) => {
        if (!error && result) {
          const paintedPixels = result.map(resultEvent => new PixelPainted(resultEvent.args))
          this.setState({ paintedPixels, isLoading: false })
        }
      })

  }

  render () {
    if (this.state.isLoading) {
      return <Spin />
    }

    if (!this.props.eventsSupported) {
      return <p>Not available. Please log into MetaMask</p>
    }

    return (
      <h4>User with this address has painted <b>{this.state.paintedPixels.length}</b> pixels.</h4>
    )
  }
}

export default withWeb3(PixelsPainted)
