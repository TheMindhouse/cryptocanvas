import React from 'react'
import getComponentDisplayName from '../helpers/getComponentDisplayName'
import { SelectedPixelsContext } from '../stores/SelectedPixelsProvider'

export const withSelectedPixels = (WrappedComponent) => {
  class withSelectedPixels extends React.Component {
    render () {
      return (
        <SelectedPixelsContext.Consumer>
          {selectedPixelsStore => <WrappedComponent {...this.props} selectedPixelsStore={selectedPixelsStore} />}
        </SelectedPixelsContext.Consumer>
      )
    }
  }

  withSelectedPixels.displayName = `withSelectedPixels(${getComponentDisplayName(WrappedComponent)})`

  return withSelectedPixels
}
