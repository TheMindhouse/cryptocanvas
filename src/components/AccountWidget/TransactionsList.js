// @flow
import React from 'react'
import { cutAddress } from '../../helpers/strings'
import { Transaction, TRANSACTION_STATUS } from '../../models/Transaction'
import { Badge, Table } from 'antd'
import './styles/TransactionsList.css'

const columns = [
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => {
      switch (status) {
        case TRANSACTION_STATUS.pending:
          return <Badge status="processing" text={status} className="TransactionsList__Badge TransactionsList__Badge--pending text-nowrap"/>
        case TRANSACTION_STATUS.failed:
          return <Badge status="error" text={status} className="TransactionsList__Badge TransactionsList__Badge--failed text-nowrap"/>
        case TRANSACTION_STATUS.completed:
        default:
          return <Badge status="success" text={status} className="TransactionsList__Badge TransactionsList__Badge--completed text-nowrap"/>
      }
    }
  },
  {
    title: 'Transaction Type',
    dataIndex: 'name',
    key: 'name',
    render: (name: string) => <b>{name}</b>
  },
  {
    title: 'Timestamp',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (date: Date) => date.toISOString(),
  },
  {
    title: 'Hash',
    dataIndex: 'hash',
    key: 'hash',
    render: (hash: string) => <a href={`https://ropsten.etherscan.io/tx/${hash}`} target="_blank"
                                 className="font-monospace text-nowrap"
                                 rel="noopener noreferrer">{hash.substr(0, 8)}</a>
  },
]

type Props = {
  transactions: Array<Transaction>,
}

const TransactionsList = (props: Props) => {
  return (
    <div>
      <Table columns={columns} dataSource={props.transactions} />
    </div>
  )
}

TransactionsList.propTypes = {}
TransactionsList.defaultProps = {}

export default TransactionsList
