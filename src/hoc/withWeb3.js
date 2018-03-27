import React from 'react'
import getComponentDisplayName from '../helpers/getComponentDisplayName'
import ABI from '../helpers/ABI.json'
import { ContractModel } from '../models/ContractModel'

const Web3 = window.Web3

const CHECK_ACCOUNT_DELAY = 500

const withWeb3 = (WrappedComponent) => {
  class withWeb3 extends React.Component {
    constructor (props) {
      super(props)

      // TODO keep web3 and contract in Redux?

      if (typeof window.web3 !== 'undefined') {
        window.web3 = new Web3(window.web3.currentProvider)
      } else {
        window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
      }

      this.web3 = window.web3

      // Set default account
      window.web3.eth.defaultAccount = window.web3.eth.accounts[ 0 ]

      const ContractInstance = window.web3.eth.contract(ABI)
      this.Contract = new ContractModel(ContractInstance.at('0x8cdaf0cd259887258bc13a92c0a6da92698644c0'))

      this.state = {
        account: this.web3.eth.accounts[ 0 ]
      }
    }

    componentDidMount () {
      this.checkAccountInterval = setInterval(() => {
        this.checkAccount()
      }, CHECK_ACCOUNT_DELAY)
    }

    componentWillUnmount () {
      window.clearInterval(this.checkAccountInterval)
    }

    checkAccount = () => {
      const account = this.web3.eth.accounts[ 0 ]
      if (account !== this.state.account) {
        this.setState({ account })
      }
    }

    getBlockNumber = () => {
      return new Promise((resolve, reject) => {
        this.web3.eth.getBlockNumber((error, result) => {
          if (error) {
            console.error(error)
            reject(error)
          } else {
            resolve(result)
          }
        })
      })
    }

    render () {
      const {
        ...passThroughProps
      } = this.props

      const injectedProps = {
        Contract: this.Contract,
        account: this.state.account,
        getBlockNumber: this.getBlockNumber,
      }

      const props = Object.assign(
        {},
        passThroughProps,
        injectedProps
      )

      return <WrappedComponent {...props} />
    }
  }

  withWeb3.displayName = `withWeb3(${getComponentDisplayName(WrappedComponent)})`

  return withWeb3
}

export default withWeb3
