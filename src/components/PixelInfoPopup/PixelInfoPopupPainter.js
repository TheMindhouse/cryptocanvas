// @flow
import * as React from 'react'
import withWeb3 from '../../hoc/withWeb3'
import { ContractModel } from '../../models/ContractModel'
import { Alert, Spin } from 'antd'
import { cutAddress } from '../../helpers/strings'

type Props = {
  canvasId: number,
  pixelId: number,
  // from withWeb3
  account: string,
  Contract: ContractModel,
}

type State = {
  authorAddress: ?string,
}

class PixelInfoPopupPainter extends React.PureComponent<Props, State> {
  static defaultProps = {}

  state = {
    authorAddress: null,
    isLoading: true,
  }

  componentDidMount () {
    this.getAuthorAddress()
  }

  componentDidUpdate (prevProps: Props) {
    if (this.props.pixelId !== prevProps.pixelId) {
      this.setState({ authorAddress: null }, () => this.getAuthorAddress())
    }
  }

  getAuthorAddress = () => {
    this.props.Contract.getPixelAuthor(this.props.canvasId, this.props.pixelId)
      .then(authorAddress => this.setState({ authorAddress }))
  }

  render () {
    if (!this.state.authorAddress) {
      return <Spin delay={500} />
    }
    return (
      <div>
        <h3>{cutAddress(this.state.authorAddress)}</h3>
        {
          this.state.authorAddress === this.props.account &&
          <Alert message="It's your pixel! 🚀" type="success" />
        }
      </div>
    )
  }
}

export default withWeb3(PixelInfoPopupPainter)
