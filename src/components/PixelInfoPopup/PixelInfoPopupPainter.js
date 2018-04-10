// @flow
import * as React from 'react'
import withWeb3 from '../../hoc/withWeb3'
import { ContractModel } from '../../models/ContractModel'
import { Spin } from 'antd'
import { cutAddress } from '../../helpers/strings'

type Props = {
  canvasId: number,
  pixelId: number,
  // from withWeb3
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

  componentDidUpdate(prevProps: Props) {
    if (this.props.pixelId !== prevProps.pixelId) {
      this.setState({ authorAddress: null }, () => this.getAuthorAddress())
    }
  }

  getAuthorAddress = () => {
    this.props.Contract.getPixelAuthor(this.props.canvasId, this.props.pixelId)
      .then(authorAddress => this.setState({ authorAddress }))
  }

  render () {
    return (
      <div>
        {
          this.state.authorAddress
            ? <h3>{cutAddress(this.state.authorAddress)}</h3>
            : <Spin delay={300}/>
        }
      </div>
    )
  }
}

export default withWeb3(PixelInfoPopupPainter)
