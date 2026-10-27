// Sends an event to Google Analytics when it is running (live domain only; see layout/Analytics).
export function track(event: string, params?: Record<string, string>) {
  const { gtag } = window as Window & { gtag?: (...args: unknown[]) => void };
  gtag?.("event", event, params);
}
