// @flow
type Props = {
  name: string,
  fromAddress: string,
  toAddress?: string,
  value: number,
  txHash: string,
  blockNumber: number,
  logIndex: number,
}

export class CanvasHistoryTx {
  _name: string
  _fromAddress: string
  _toAddress: ?string
  _value: number
  _txHash: string
  _blockNumber: number
  _logIndex: number

  constructor (props: Props) {
    this._name = props.name
    this._fromAddress = props.fromAddress
    this._toAddress = props.toAddress
    this._value = props.value
    this._txHash = props.txHash
    this._blockNumber = props.blockNumber
    this._logIndex = props.logIndex
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

  get blockNumber (): number {
    return this._blockNumber
  }

  get logIndex (): number {
    return this._logIndex
  }
}