import React from 'react'
import { Button, Modal } from 'antd'
import TransactionsList from '../Account/TransactionsList'

class TransactionsModal extends React.PureComponent {
  render() {
    return (
      <Modal
        title="Transactions List"
        visible={this.props.modal.isVisible}
        onCancel={this.props.modal.close}
        footer={[
          <Button type="danger" onClick={this.props.onClear} key="0">Clear All</Button>,
          <Button key="submit" type="primary" onClick={this.props.modal.close} key="1">Close Modal</Button>,
        ]}
      >
        <TransactionsList transactions={this.props.transactions} />
      </Modal>
    );
  }
}

TransactionsModal.propTypes = {}
TransactionsModal.defaultProps = {}

export default TransactionsModal
