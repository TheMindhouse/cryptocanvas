import React from 'react'
import PropTypes from 'prop-types'

import './styles/AccountStatus.css'
import withWeb3 from '../../hoc/withWeb3'
import { cutAddress } from '../../helpers/strings'

const StatusDisconnected = () =>
  <div>
    <b>Ethereum Not Connected</b><br />
    <span>Sign in to MetaMask</span>
  </div>

const StatusConnected = ({ account }) =>
  <div>
    <b>Connected to Ethereum</b><br />
    <span>{cutAddress(account)}</span>
  </div>

class AccountStatus extends React.PureComponent {
  render () {
    return (
      <div className="AccountStatus">
        {!this.props.account && <StatusDisconnected />}
        {this.props.account && <StatusConnected account={this.props.account} />}
      </div>
    )
  }
}

AccountStatus.propTypes = {}
AccountStatus.defaultProps = {}

export default withWeb3(AccountStatus)
