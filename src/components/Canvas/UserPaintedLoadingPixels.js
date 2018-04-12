// @flow
import * as React from 'react'
import withTransactions from '../../hoc/withTransactions'
import { Transaction, TRANSACTION_STATUS } from '../../models/Transaction'
import { TransactionWithPixel } from '../../models/TransactionWithPixel'
import { LoadingPixel } from './LoadingPixel'

type Props = {
  txStore: {
    transactions: Array<Transaction|TransactionWithPixel>
  },
  pixelSize: number,
  canvasId: number,
}

class UserPaintedLoadingPixels extends React.PureComponent<Props> {
  static defaultProps = {}

  getCanvasPendingTransactions = () => {
      const y = this.props.txStore.transactions.filter((tx: Transaction|TransactionWithPixel) =>
        tx.status === TRANSACTION_STATUS.pending &&
        tx instanceof TransactionWithPixel &&
        tx.canvasId === this.props.canvasId
      )
    return y
  }


  render() {
    return (
      <div>
        {this.getCanvasPendingTransactions().map((tx: TransactionWithPixel, i: number) =>
          <LoadingPixel
            pixelIndex={tx.pixelIndex}
            pixelSize={this.props.pixelSize}
            key={i}
          />
        )}
      </div>
    )
  }
}

export default withTransactions(UserPaintedLoadingPixels)
