import type { AnalyticsEvent } from './AnalyticsEvent'

export type WithAnalytics = {
  pageview: (Object) => void,
  set: (Object) => void,
  event: (AnalyticsEvent) => void,
}