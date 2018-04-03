import React from 'react'
import { Divider } from 'antd'

const AccountTransactions = ({ transactions, onClear }) => {
  return (
    <div>
      {
        transactions.map((tx, index) =>
          <div key={index}>
            <b>{tx.name}</b> - {tx.status}
          </div>)
      }
      <Divider dashed={true} />
      <b onClick={onClear}>Clear</b>
    </div>
  )
}

AccountTransactions.propTypes = {}
AccountTransactions.defaultProps = {}

export default AccountTransactions
