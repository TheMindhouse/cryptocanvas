// @flow
import * as React from 'react'
import { Alert, Row } from 'antd'
import withWeb3 from '../hoc/withWeb3'
import PixelsPainted from '../components/Account/PixelsPainted'
import AccountBalance from '../components/Account/AccountBalance'
import { AccountBalanceHeader } from '../components/Account/AccountBalanceHeader'
import CanvasesOwned from '../components/Account/CanvasesOwned'
import HighestBids from '../components/Account/HighestBids'
import { setDocumentTitle } from '../helpers/utils'

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

  componentDidMount () {
    setDocumentTitle('Account Details')
  }

  render () {
    const urlAccountAddress = this.props.match.params.address
    return (
      <div>
        <div className="containerWrapper" style={{ marginBottom: 50 }}>
          <Row className="container">
            <h1><b>Account Details</b></h1>
            <h2 className="text-wrap">{urlAccountAddress}</h2>
          </Row>
        </div>

        <Row className="container">

          {
            urlAccountAddress === this.props.account &&
            <Alert type="success" message="This is your account" showIcon />
          }

          <br />

          <AccountBalanceHeader />
          <AccountBalance accountAddress={urlAccountAddress}/>

          <br /><br />

          <CanvasesOwned accountAddress={urlAccountAddress}/>

          <br />

          <HighestBids accountAddress={urlAccountAddress}/>

          <br />

          <PixelsPainted accountAddress={urlAccountAddress}/>

          <br /><br />

          <i className="text-info">More stats coming soon!</i>

        </Row>
      </div>
    )
  }
}

Account = withWeb3(Account)
export { Account }
