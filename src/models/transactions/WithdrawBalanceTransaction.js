// @flow
import { Transaction } from '../Transaction'

type Props = {
  ...Transaction,
  address: string,
  amount: number,
}

export class WithdrawBalanceTransaction extends Transaction {
  constructor (props: Props) {
    super(props)
    this.address = props.address
    this.amount = props.amount
  }
}