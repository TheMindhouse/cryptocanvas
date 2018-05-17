// @flow
import React from 'react'
import ReactGA from 'react-ga'
import getComponentDisplayName from '../helpers/getComponentDisplayName'
import { AnalyticsEvent } from '../types/AnalyticsEvent'

const pageview = (path: string) => {
  return ReactGA.pageview(path)
}

const set = (fieldsObject: Object) => {
  return ReactGA.set(fieldsObject)
}

const event = (event: AnalyticsEvent) => {
  const {
    category,
    action,
    label = '',
    value,
    nonInteraction = false,
  } = event
  return ReactGA.event({
    category,
    action,
    label,
    value,
    nonInteraction,
  });
}

const withAnalytics = (WrappedComponent: Object) => {
  class withAnalytics extends React.Component<{}> {
    analyticsAPI = {
      pageview,
      set,
      event
    }

    render () {
      const {
        ...passThroughProps
      } = this.props

      const injectedProps = {
        analyticsAPI: this.analyticsAPI
      };

      const props = Object.assign(
        {},
        passThroughProps,
        injectedProps
      )

      return <WrappedComponent {...props} />
    }
  }

  withAnalytics.displayName =
    `withAnalytics(${getComponentDisplayName(WrappedComponent)})`

  return withAnalytics
}

export { withAnalytics }
