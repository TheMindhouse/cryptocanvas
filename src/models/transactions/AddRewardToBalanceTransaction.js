// @flow
import { Transaction } from '../Transaction'

type Props = {
  ...Transaction,
  canvasId: number,
}

export class AddRewardToBalanceTransaction extends Transaction {
  constructor (props: Props) {
    super(props)
    this.canvasId = props.canvasId
  }
}