import React from 'react'
import getComponentDisplayName from '../helpers/getComponentDisplayName'
import { ABI } from '../helpers/ABI'
import { ContractModel } from '../models/ContractModel'

const Web3 = window.Web3

const withWeb3 = (WrappedComponent) => {
  class withWeb3 extends React.Component {
    constructor(props) {
      super(props)

      if (typeof window.web3 !== 'undefined') {
        window.web3 = new Web3(window.web3.currentProvider)
      } else {
        window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
      }

      this.web3 = window.web3
      console.log(window.web3)

      // Set default account
      window.web3.eth.defaultAccount = window.web3.eth.accounts[0]
      console.log('defaultAccount', window.web3.eth.defaultAccount)

      const ContractInstance = window.web3.eth.contract(ABI)
      this.Contract = new ContractModel(ContractInstance.at('0x28a435af3834969dc4a74f4b4d5ee4d70ca82237'))
      console.log(this.Contract)

      // watch for changes
      // this.Contract.allEvents().watch(function(error, event){
      //   console.log('[EVENT] all events')
      //   if (!error)
      //     console.log(event);
      // });
    }

    render () {
      const {
        ...passThroughProps
      } = this.props

      const injectedProps = {
        web3: this.web3,
        Contract: this.Contract
      };

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
