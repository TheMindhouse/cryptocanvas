// @flow
import * as React from 'react'
import { CanvasHistoryTx } from '../../models/CanvasHistoryTx'
import { Table } from 'antd'
import { EtherscanLink } from '../Small/EtherscanLink'
import { AccountAddressLink } from '../Small/AccountAddressLink'

type Props = {
  transactions: Array<CanvasHistoryTx>
}

const columns = [
  {
    title: 'Type',
    dataIndex: 'name',
    key: 'name',
    render: (name: string) => <b>{name}</b>
  },
  {
    title: 'From',
    dataIndex: 'fromAddress',
    key: 'fromAddress',
    render: (address: string) => <AccountAddressLink address={address}/>
  },
  {
    title: 'To',
    dataIndex: 'toAddress',
    key: 'toAddress',
    render: (address: string) => <AccountAddressLink address={address}/>
  },
  {
    title: 'Amount',
    dataIndex: 'value',
    key: 'value',
    render: (value: number) => `${value}Ξ`
  },
  {
    title: 'Tx hash',
    dataIndex: 'txHash',
    key: 'txHash',
    render: (hash: string) => <EtherscanLink hash={hash} />
  }
]

class TransactionsHistoryList extends React.PureComponent<Props> {
  static defaultProps = {}

  render () {
    return (
      <Table dataSource={this.props.transactions} columns={columns} size="small" />
    )
  }
}

export { TransactionsHistoryList }
