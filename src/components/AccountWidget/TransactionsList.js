import React from 'react'

const TransactionsList = ({ transactions }) => {
  return (
    <div>
      {
        transactions.map((tx, index) =>
          <div key={index}>
            <b>{tx.name}</b> - {tx.status}
          </div>)
      }
    </div>
  )
}

TransactionsList.propTypes = {}
TransactionsList.defaultProps = {}

export default TransactionsList
