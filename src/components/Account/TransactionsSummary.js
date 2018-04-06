import React from 'react'
import { TRANSACTION_STATUS } from '../../models/Transaction'

const TransactionsSummary = ({ transactions }) => {
  return (
    <div>
      {
        transactions.reduce((acc, tx) => {
          switch (tx.status) {
            case TRANSACTION_STATUS.pending:
              acc[0] = acc[0] + 1
              return acc
            case TRANSACTION_STATUS.completed:
              acc[1] = acc[1] + 1
              return acc
            case TRANSACTION_STATUS.failed:
              acc[2] = acc[2] + 1
              return acc
          }
        }, [0, 0, 0]).map((val, i) => <p>{val}</p>)
      }
    </div>
  )
}

TransactionsSummary.propTypes = {}
TransactionsSummary.defaultProps = {}

export { TransactionsSummary }
