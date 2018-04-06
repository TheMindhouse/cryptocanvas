import React from 'react'
import { Modal } from 'antd'
import TransactionsList from '../Account/TransactionsList'

class TransactionsModal extends React.PureComponent {
  render() {
    return (
      <Modal
        title="Transactions List"
        visible={this.props.modal.isVisible}
        closable={false}
        cancelText="Clear all & close"
        onCancel={this.props.onClear}
        okText="Close"
        onOk={this.props.modal.close}
      >
        <TransactionsList transactions={this.props.transactions} />
      </Modal>
    );
  }
}

TransactionsModal.propTypes = {}
TransactionsModal.defaultProps = {}

export default TransactionsModal
