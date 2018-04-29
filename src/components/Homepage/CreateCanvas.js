import React from 'react'
import { Spin, message } from 'antd'

import './styles/CreateCanvas.css'
import withWeb3 from '../../hoc/withWeb3'
import { LocalStorageManager } from '../../localStorage'

class CreateCanvas extends React.PureComponent {
  state = {
    loading: false,
  }

  onCreateCanvas = () => {
    this.setState({ loading: true })
    this.props.Contract.createCanvas()
      .then((tx) => {
        LocalStorageManager.transactions.updateTransactions(tx)
        message.success('Create Canvas Transaction sent')
        this.setState({ loading: false })
      })
      .catch(() => {
        this.setState({ loading: false })
      })
  }

  render () {
    return this.props.account
      ? (
        <div className="CreateCanvas" onClick={this.onCreateCanvas}>
          <div className="CreateCanvas__content">
            <Spin spinning={this.state.loading} className="CreateCanvas__spinner">
            <span>
              Create<br />
              new canvas
            </span>
            </Spin>
          </div>
        </div>
      )
      : null
  }
}

CreateCanvas.propTypes = {}
CreateCanvas.defaultProps = {}

export default withWeb3(CreateCanvas)
