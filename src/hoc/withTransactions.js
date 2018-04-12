import React from 'react'
import getComponentDisplayName from '../helpers/getComponentDisplayName'
import { TransactionsContext } from '../stores/TransactionsProvider'

const withTransactions = (WrappedComponent) => {
  class withTransactions extends React.Component {
    render () {
      return (
        <TransactionsContext.Consumer>
          {txStore => <WrappedComponent {...this.props} txStore={txStore} />}
        </TransactionsContext.Consumer>
      )
    }
  }

  withTransactions.displayName = `withTransactions(${getComponentDisplayName(WrappedComponent)})`

  return withTransactions
}

export default withTransactions
