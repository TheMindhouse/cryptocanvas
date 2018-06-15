// @flow
import * as React from 'react'
import withTransactions from '../../hoc/withTransactions'
import { Transaction, TRANSACTION_STATUS } from '../../models/Transaction'
import { LoadingPixel } from './LoadingPixel'
import { TransactionWithPixels } from '../../models/TransactionWithPixels'
import type { PixelIndex } from '../../types/PixelIndex'

type Props = {
  txStore: {
    transactions: Array<Transaction | TransactionWithPixels>
  },
  pixelSize: number,
  canvasId: number,
}

type PixelIndexWithColor = {
  pixelIndex: PixelIndex,
  colorId: number,
}

class UserPaintedLoadingPixels extends React.PureComponent<Props> {
  static defaultProps = {}

  getCanvasPendingTransactions = () => {
    return this.props.txStore.transactions.filter((tx: Transaction | TransactionWithPixels) =>
      tx.status === TRANSACTION_STATUS.pending &&
      tx instanceof TransactionWithPixels &&
      tx.canvasId === this.props.canvasId
    )
  }

  render () {
    const pendingPixelsTransactions = this.getCanvasPendingTransactions()
    const pendingPixelsArrays: Array<Array<PixelIndexWithColor>> = pendingPixelsTransactions.map(
      (tx: TransactionWithPixels): Array<PixelIndexWithColor> =>
        tx.pixelIndexes.map((pixelIndex: PixelIndex, i: number): PixelIndexWithColor => ({
            pixelIndex,
            colorId: tx.colorIds[ i ],
          })
        )
    )
    const pendingPixels: Array<PixelIndexWithColor> = [].concat(...pendingPixelsArrays)
    return (
      <div>
        {pendingPixels.map((pixel: PixelIndexWithColor) =>
          <LoadingPixel
            pixelIndex={pixel.pixelIndex}
            pixelSize={this.props.pixelSize}
            colorId={pixel.colorId}
            key={pixel.pixelIndex.id}
          />
        )}
      </div>
    )
  }
}

export default withTransactions(UserPaintedLoadingPixels)
