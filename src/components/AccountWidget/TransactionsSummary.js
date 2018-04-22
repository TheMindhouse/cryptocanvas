import React from 'react'
import { TRANSACTION_STATUS } from '../../models/Transaction'
import { Badge, Tooltip } from 'antd'
import './styles/TransactionsSummary.css'

const TransactionsSummary = ({ transactions, onShowAll }) => {
  if (!transactions.length) {
    return (
      <small>No transaction history</small>
    )
  }
  const txArray = transactions.reduce((acc, tx) => {
    switch (tx.status) {
      case TRANSACTION_STATUS.pending:
        acc[ 0 ] = acc[ 0 ] + 1
        return acc
      case TRANSACTION_STATUS.completed:
        acc[ 1 ] = acc[ 1 ] + 1
        return acc
      case TRANSACTION_STATUS.failed:
        acc[ 2 ] = acc[ 2 ] + 1
        return acc
    }
  }, [ 0, 0, 0 ])

  return (
    <a onClick={onShowAll} className="TransactionsSummary">
      <Tooltip title="Pending transactions">
        <div className="TransactionsSummary__Badge">
          <Badge status="processing" text={txArray[ 0 ]} />
        </div>
      </Tooltip>
      <Tooltip title="Completed transactions">
        <div className="TransactionsSummary__Badge">
          <Badge status="success" text={txArray[ 1 ]} />
        </div>
      </Tooltip>
      <Tooltip title="Failed transactions">
        <div className="TransactionsSummary__Badge">
          <Badge status="error" text={txArray[ 2 ]} />
        </div>
      </Tooltip>
      <span>Show All</span>
    </a>
  )
}

TransactionsSummary.propTypes = {}
TransactionsSummary.defaultProps = {}

export { TransactionsSummary }
