// Umami events. Never pass personal data (names, emails, message text) as event data.
export type AnalyticsEvent =
  | `${string}_section_view`
  | 'contact_form_submit'
  | 'contact_form_error'

export const track = (event: AnalyticsEvent, data?: Record<string, string | number | boolean>): void => {
  window.umami?.track(event, data)
}
