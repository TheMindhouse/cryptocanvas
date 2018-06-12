// @flow
import * as React from 'react'
import withModal from '../../hoc/withModal'
import type { WithModal } from '../../types/WithModal'
import { Button } from 'antd'
import { SetCanvasNameModal } from '../Modals/SetCanvasNameModal'
import { TRANSACTION_TYPE } from '../../models/Transaction'
import { PendingTransactionInfo } from '../Small/PendingTransactionInfo'
import { message } from 'antd/lib/index'
import { LocalStorageManager } from '../../localStorage'
import withWeb3 from '../../hoc/withWeb3'
import { ContractModel } from '../../models/ContractModel'

type Props = {
  canvasId: number,
  modal: WithModal,
  // withWeb3
  Contract: ContractModel,
}

class SetCanvasName extends React.PureComponent<Props> {
  static defaultProps = {}

  onModalSubmit = (name: string) => {
    this.props.Contract.setCanvasName(this.props.canvasId, name)
      .then(transaction => {
        this.props.modal.close()
        LocalStorageManager.transactions.updateTransactions(transaction)
        message.success('Change Canvas Name transaction sent')
      })
  }
  
  render() {
    return (
      <div>
        <SetCanvasNameModal
          modal={this.props.modal}
          onModalSubmit={this.onModalSubmit}
        />
        <Button type="primary" onClick={this.props.modal.show}>Change Canvas Name</Button>
        <PendingTransactionInfo type={TRANSACTION_TYPE.setCanvasName} canvasId={this.props.canvasId} />
      </div>
    )
  }
}

SetCanvasName = withWeb3(withModal(SetCanvasName))
export { SetCanvasName }
