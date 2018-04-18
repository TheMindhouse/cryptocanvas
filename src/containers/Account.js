// @flow
import * as React from 'react'
import { Icon, Popover, Row } from 'antd'
import { Link } from 'react-router-dom'

type Props = {
  match: {
    params: {
      address: string,
    },
  },
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
          <h2>
            <Popover
              content={
                <span>
                  Balance of the account on the CryptoCanvas Ethereum Contract.<br />
                  See <Link to="/about#withdrawing-rewards-and-profits">About / Withdrawing Rewards and Profits</Link>
                </span>
              }
              title=""
              placement="top"
              trigger="hover"
            >
              <b>Account Balance </b>
              <small><Icon type="question-circle-o" /></small>
            </Popover>
          </h2>
        </Row>
      </div>
    )
  }
}

export { Account }
