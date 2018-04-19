// @flow
import * as React from 'react'
import { Icon, Popover } from 'antd'
import { HashLink } from 'react-router-hash-link'

const AccountBalanceHeader = () => {
  return (
    <h2>
      <Popover
        content={
          <span>
            Balance of the account on the CryptoCanvas Ethereum Contract.<br />
            See <HashLink to="/about#withdrawing-rewards-and-profits">About / Withdrawing Rewards and Profits</HashLink>
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
  )
}

AccountBalanceHeader.defaultProps = {}

export { AccountBalanceHeader }
