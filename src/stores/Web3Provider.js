import React from 'react'
import { ContractModel } from '../models/ContractModel'
import ABI from '../helpers/ABI.json'

const Web3Context = React.createContext()

// const CONTRACT_ADDRESS = '0x4d5cafaa44847c01fe22bbc0cf9771b64782fa29'
const CONTRACT_ADDRESS = '0x5e68426C7bBCEe3F590B95Dd52066AA2efF6165B' // Rinkeby testnet
// const WEB3_HTTP_PROVIDER = 'http://localhost:8545'
const WEB3_HTTP_PROVIDER = 'https://rinkeby.infura.io/ML50g9METlqvSTgwiJTm'
const CHECK_ACCOUNT_DELAY = 2000

const Web3 = window.Web3

class Web3Provider extends React.Component {
  constructor (props) {
    super(props)

    console.log('Setting up Web3 Provider')

    let eventsSupported = false
    let metamaskAvailable = false

    if (typeof window.web3 !== 'undefined') {
      window.web3 = new Web3(window.web3.currentProvider)
      eventsSupported = true
      metamaskAvailable = true
    } else {
      console.log('Metamask not found - using Infura!')
      window.web3 = new Web3(new Web3.providers.HttpProvider(WEB3_HTTP_PROVIDER))

      // todo - temporary for dev purposes
      // metamaskAvailable = true
      // eventsSupported = true
    }

    eventsSupported
      ? console.log('Events supported')
      : console.log('Events not supported')

    this.ContractInstance = window.web3.eth.contract(ABI)
    const Contract = new ContractModel(this.ContractInstance.at(CONTRACT_ADDRESS))

    window.Contract = Contract

    this.state = {
      web3: window.web3,
      Contract,
      getBlockNumber: this.getBlockNumber,
      eventsSupported,
      metamaskAvailable,
    }
  }

  componentDidMount () {
    this.checkAccount()
    this.checkAccountInterval = setInterval(() => {
      this.checkAccount()
    }, CHECK_ACCOUNT_DELAY)
  }

  componentWillUnmount () {
    window.clearInterval(this.checkAccountInterval)
  }

  checkAccount = () => {
    window.web3.eth.getAccounts((error, accounts = []) => {
      const account = accounts[0]
      if (account !== this.state.account) {
        const Contract = new ContractModel(this.ContractInstance.at(CONTRACT_ADDRESS), account)
        this.setState({ account, Contract })
      }
    })
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
