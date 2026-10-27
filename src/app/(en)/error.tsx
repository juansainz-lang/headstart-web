"use client";

import ErrorScreen from "@/components/layout/ErrorScreen";

// Error boundaries run in the browser: the copy stays here (not in lib/content)
// so the whole site text isn't shipped with them.
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorScreen
      title="Something went wrong."
      body="Please reload the page. If it keeps happening, email us."
      reload="Reload"
      reset={reset}
    />
  );
}
