import React from 'react'
import getComponentDisplayName from '../helpers/getComponentDisplayName'
import type { WithModal } from '../types/WithModal'

const withModal = (WrappedComponent) => {
  class withModal extends React.Component {
    state = {
      isVisible: false,
    }

    show = () => this.setState({ isVisible: true })

    close = () => this.setState({ isVisible: false })

    render () {
      const {
        ...passThroughProps
      } = this.props

      const modal: WithModal = {
        show: this.show,
        close: this.close,
        isVisible: this.state.isVisible,
      }

      const injectedProps = {
        modal,
      }

      const props = Object.assign(
        {},
        passThroughProps,
        injectedProps
      )

      return <WrappedComponent {...props} />
    }
  }

  withModal.displayName = `withModal(${getComponentDisplayName(WrappedComponent)})`

  return withModal
}

export default withModal
