import React from 'react'
import { cutAddress } from '../../helpers/strings'

const TransactionsList = ({ transactions }) => {
  return (
    <div>
      {
        transactions.map((tx, index) =>
          <div key={index}>
            <b>{tx.name}</b> (
            <a href={`https://ropsten.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">{cutAddress(tx.hash)}</a>
            ) - {tx.status}
          </div>)
      }
    </div>
  )
}

TransactionsList.propTypes = {}
TransactionsList.defaultProps = {}

export default TransactionsList
