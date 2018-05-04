// @flow
import React from 'react'
import { Transaction, TRANSACTION_STATUS } from '../../models/Transaction'
import { Badge, Table } from 'antd'
import './styles/TransactionsList.css'
import { EtherscanLink } from '../Small/EtherscanLink'
import Moment from 'react-moment'

const columns = [
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => {
      switch (status) {
        case TRANSACTION_STATUS.pending:
          return <Badge status="processing" text={status}
                        className="TransactionsList__Badge TransactionsList__Badge--pending text-nowrap" />
        case TRANSACTION_STATUS.failed:
          return <Badge status="error" text={status}
                        className="TransactionsList__Badge TransactionsList__Badge--failed text-nowrap" />
        case TRANSACTION_STATUS.completed:
        default:
          return <Badge status="success" text={status}
                        className="TransactionsList__Badge TransactionsList__Badge--completed text-nowrap" />
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
    defaultSortOrder: 'descend',
    sorter: (a: Transaction, b: Transaction) => a.timestamp - b.timestamp,
    render: (date: Date) => <Moment format="YYYY/MM/DD HH:mm:ss">{date}</Moment>,
  },
  {
    title: 'Hash',
    dataIndex: 'hash',
    key: 'hash',
    render: (hash: string) => <EtherscanLink hash={hash} />
  },
]

type Props = {
  transactions: Array<Transaction>,
}

const TransactionsList = (props: Props) => {
  return (
    <div>
      <Table columns={columns} dataSource={props.transactions} rowKey={(tx: Transaction) => tx.hash}/>
    </div>
  )
}

TransactionsList.propTypes = {}
TransactionsList.defaultProps = {}

export default TransactionsList
