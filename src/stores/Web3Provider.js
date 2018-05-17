import React from 'react'
import { ContractModel } from '../models/ContractModel'
import ABI from '../helpers/ABI.json'
import { CONFIG } from '../config'
import { withAnalytics } from '../hoc/withAnalytics'
import { ANALYTICS_ACTIONS, ANALYTICS_EVENTS } from '../constants/analytics'

const Web3Context = React.createContext()

const Web3 = window.Web3

class Web3Provider extends React.Component {
  constructor (props) {
    super(props)

    // console.log('Setting up Web3 Provider')

    let eventsSupported = false
    let metamaskAvailable = false

    if (typeof window.web3 !== 'undefined') {
      window.web3 = new Web3(window.web3.currentProvider)
      eventsSupported = true
      metamaskAvailable = true
    } else {
      console.log('Metamask not found - using Infura!')
      window.web3 = new Web3(new Web3.providers.HttpProvider(CONFIG.WEB3_HTTP_PROVIDER))

      // todo - temporary for dev purposes
      // metamaskAvailable = true
      // eventsSupported = true
    }

    eventsSupported
      ? console.log('Events supported')
      : console.log('Events not supported')

    this.ContractInstance = window.web3.eth.contract(ABI)
    const Contract = new ContractModel(this.ContractInstance.at(CONFIG.CONTRACT_ADDRESS))

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
    }, CONFIG.CHECK_ACCOUNT_DELAY)
  }

  componentWillUnmount () {
    window.clearInterval(this.checkAccountInterval)
  }

  checkAccount = () => {
    window.web3.eth.getAccounts((error, accounts = []) => {
      const account = accounts[0]
      if (account !== this.state.account) {
        const Contract = new ContractModel(this.ContractInstance.at(CONFIG.CONTRACT_ADDRESS), account)
        this.setState({ account, Contract })

        // Notify analytics that user has activated Metamask
        // Event sent only once
        if (!this.accountEventSent) {
          this.props.analyticsAPI.event({
            category: ANALYTICS_EVENTS.metamask,
            action: ANALYTICS_ACTIONS.metamask.accountActive,
          })
          this.accountEventSent = true
        }
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

Web3Provider = withAnalytics(Web3Provider)

export {
  Web3Context,
  Web3Provider,
}
