// @flow
type Props = {
  name: string,
  fromAddress: string,
  toAddress?: string,
  value: number,
  txHash: string,
}

export class CanvasHistoryTx {
  _name: string
  _fromAddress: string
  _toAddress: ?string
  _value: number
  _txHash: string

  constructor (props: Props) {
    this._name = props.name
    this._fromAddress = props.fromAddress
    this._toAddress = props.toAddress
    this._value = props.value
    this._txHash = props.txHash
  }

  get name (): string {
    return this._name
  }

  get fromAddress (): string {
    return this._fromAddress
  }

  get toAddress (): ?string {
    return this._toAddress
  }

  get value (): number {
    return this._value
  }

  get txHash (): string {
    return this._txHash
  }
}