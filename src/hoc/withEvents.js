import React from 'react'
import getComponentDisplayName from '../helpers/getComponentDisplayName'

const withEvents = (WrappedComponent) => {
  class withEvents extends React.Component {
    /**
     * Array of Web3 events listening to the changes on the blockchain
     * @type {Array}
     */
    events = []

    componentWillUnmount () {
      this.events.forEach(event => {
        if (typeof event.stopWatching === 'function') {
          event.stopWatching()
        }
      })
    }

    addEvents = (newEvents) => {
      if (Array.isArray(newEvents)) {
        this.events = [...this.events, ...newEvents]
      } else {
        this.events = [...this.events, newEvents]
      }
    }


    render () {
      const {
        ...passThroughProps
      } = this.props

      const injectedProps = {
        addEvents: this.addEvents,
      }

      const props = Object.assign(
        {},
        passThroughProps,
        injectedProps
      )

      return <WrappedComponent {...props} />
    }
  }

  withEvents.displayName = `withEvents(${getComponentDisplayName(WrappedComponent)})`

  return withEvents
}

export default withEvents
