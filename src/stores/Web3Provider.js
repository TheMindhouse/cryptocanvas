import React from 'react'
import { ContractModel } from '../models/ContractModel'
import ABI from '../helpers/ABI.json'

const Web3Context = React.createContext()

const CONTRACT_ADDRESS = '0x9340334871026429ada20d9e234559305930db1b'
// const CONTRACT_ADDRESS = '0x4C17FDf7ADeA0317cb346c65727F055870745B9a'
const WEB3_HTTP_PROVIDER = 'http://localhost:8545'
// const WEB3_HTTP_PROVIDER = 'https://ropsten.infura.io/ML50g9METlqvSTgwiJTm'
const CHECK_ACCOUNT_DELAY = 2000

const Web3 = window.Web3

class Web3Provider extends React.Component {
  constructor (props) {
    super(props)

    console.log('Setting up Web3 Provider');

    let eventsSupported = false
    let metamaskAvailable = false

    if (typeof window.web3 !== 'undefined') {
      window.web3 = new Web3(window.web3.currentProvider)
      eventsSupported = true
      metamaskAvailable = true
    } else {
      console.log('Metamask not found - using Infura!')
      window.web3 = new Web3(new Web3.providers.HttpProvider(WEB3_HTTP_PROVIDER))
    }

    eventsSupported
      ? console.log('Events supported')
      : console.log('Events not supported')

    const account = metamaskAvailable ? window.web3.eth.accounts[ 0 ] : undefined

    // Set default account
    // window.web3.eth.defaultAccount = account

    const ContractInstance = window.web3.eth.contract(ABI)
    const Contract = new ContractModel(ContractInstance.at(CONTRACT_ADDRESS))

    this.state = {
      account,
      web3: window.web3,
      Contract,
      getBlockNumber: this.getBlockNumber,
      eventsSupported,
      metamaskAvailable,
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
    const account = window.web3.eth.accounts[ 0 ]
    if (account !== this.state.account) {
      this.setState({ account })
    }
  }

  getBlockNumber = () => {
    return new Promise((resolve, reject) => {
      this.state.web3.eth.getBlockNumber((error, result) => {
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
    return (
      <Web3Context.Provider value={this.state}>
        {this.props.children}
      </Web3Context.Provider>
    )
  }
}

export {
  Web3Context,
  Web3Provider,
}
