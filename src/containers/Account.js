// @flow
import * as React from 'react'
import { Alert, Icon, Popover, Row } from 'antd'
import { HashLink } from 'react-router-hash-link'
import withWeb3 from '../hoc/withWeb3'
import PixelsPainted from '../components/Account/PixelsPainted'
import AccountBalance from '../components/Account/AccountBalance'
import { AccountBalanceHeader } from '../components/Account/AccountBalanceHeader'

type Props = {
  match: {
    params: {
      address: string,
    },
  },
  // from withWeb3
  account: string,
}

class Account extends React.PureComponent<Props> {
  static defaultProps = {}

  account = this.props.match.params.address

  render () {
    return (
      <div>
        <div className="containerWrapper" style={{ marginBottom: 50 }}>
          <Row className="container">
            <h1><b>Account Details</b></h1>
            <h2>{this.account}</h2>
          </Row>
        </div>

        <Row className="container">

          <AccountBalanceHeader />
          <AccountBalance accountAddress={this.account}/>

          <br /><br />

          <h2><b>Pixels Painted</b></h2>
          <PixelsPainted accountAddress={this.account}/>
        </Row>
      </div>
    )
  }
}

Account = withWeb3(Account)
export { Account }
