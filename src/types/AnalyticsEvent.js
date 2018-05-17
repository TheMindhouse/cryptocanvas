import { ANALYTICS_ACTIONS, ANALYTICS_EVENTS } from '../constants/analytics'

export type AnalyticsEvent = {
  category: ANALYTICS_EVENTS,
  action: ANALYTICS_ACTIONS,
  label?: string,
  value?: number,
  nonInteraction?: boolean,
}