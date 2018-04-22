// @flow
import React from 'react'
import { Button, Modal, } from 'antd'
import type { WithModal } from '../../types/WithModal'
import { Transaction } from '../../models/Transaction'
import TransactionsList from '../AccountWidget/TransactionsList'
import './styles/TransactionsModal.css'

type Props = {
  transactions: Array<Transaction>,
  onClear: () => void,
  modal: WithModal,
}

class TransactionsModal extends React.PureComponent<Props> {
  render () {
    return (
      <Modal
        title="Transactions List"
        visible={this.props.modal.isVisible}
        onCancel={this.props.modal.close}
        width={900}
        className="TransactionsModal"
        footer={[
          <Button type="danger" onClick={this.props.onClear} key="0">Clear All</Button>,
          <Button key="submit" type="primary" onClick={this.props.modal.close} key="1">Close Modal</Button>,
        ]}
      >
        <TransactionsList transactions={this.props.transactions}/>
      </Modal>
    )
  }
}

export default TransactionsModal
