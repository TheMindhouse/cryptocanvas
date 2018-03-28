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
      // console.log('Stopped watching for events');
    }

    render () {
      const {
        ...passThroughProps
      } = this.props

      const injectedProps = {
        events: this.events,
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
