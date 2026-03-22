import { track } from '@vercel/analytics'

export function trackEvent(
  eventName: string,
  properties?: Record<string, string | number | boolean | null>
) {
  track(eventName, properties)
}