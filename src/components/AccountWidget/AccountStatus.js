import React from 'react'
import { Alert } from 'antd'

import './styles/AccountStatus.css'
import withWeb3 from '../../hoc/withWeb3'
import { cutAddress } from '../../helpers/strings'
import withModal from '../../hoc/withModal'
import TransactionsModal from '../Modals/TransactionsModal'
import { TransactionsSummary } from './TransactionsSummary'
import withTransactions from '../../hoc/withTransactions'
import { Link } from 'react-router-dom'
import { URLHelper } from '../../helpers/URLhelper'

const StatusMetaMaskNotAvailable = () => (
  <span className="AccountStatus__InstallMetaMaskInfo">
    To participate in painting and trading
    CryptoCanvas on this site, <Link to={URLHelper.help.page}>install the MetaMask Chrome plugin</Link>.
  </span>
)

const StatusDisconnected = () =>
  <Alert
    message="Log in to MetaMask"
    description="Ethereum available but not connected"
    type="error"
    showIcon
  />

const StatusConnected = ({ account }) =>
  <div>
    <span className="AccountStatus__info">My Transactions History</span><br />
    <span className="AccountStatus__address"><Link to={`/account/${account}`}>{cutAddress(account)}</Link></span>
  </div>

class AccountStatus extends React.PureComponent {
  onClearTransactions = () => {
    this.props.modal.close()
    this.props.txStore.clearTransactions()
  }

  render () {
    return (
      <div className="AccountStatus">
        {
          !this.props.account && this.props.metamaskAvailable &&
          <StatusDisconnected />
        }

        {
          !this.props.account && !this.props.metamaskAvailable &&
          <StatusMetaMaskNotAvailable />
        }

        {
          this.props.account &&
          <div>
            <StatusConnected account={this.props.account} />
            <div>
              <TransactionsModal
                modal={this.props.modal}
                transactions={this.props.txStore.transactions}
                onClear={this.onClearTransactions}
              />
              <TransactionsSummary
                transactions={this.props.txStore.transactions}
                onShowAll={this.props.modal.show}
              />
            </div>
          </div>
        }

      </div>
    )
  }
}

AccountStatus.propTypes = {}
AccountStatus.defaultProps = {}

export default withTransactions(withWeb3(withModal(AccountStatus)))
