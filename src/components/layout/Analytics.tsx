import Script from "next/script";
import { site } from "@/lib/site";

// Google Analytics 4: visits, traffic sources and booked calls ("generate_lead").
// Starts when the browser is idle, after the page is usable, so it never slows the first
// paint. Runs only on the live domain: local previews and Netlify drafts don't count.
export default function Analytics() {
  if (!site.analyticsId) return null;
  const id = JSON.stringify(site.analyticsId);
  const host = JSON.stringify(new URL(site.url).hostname);

  return (
    <Script id="analytics" strategy="lazyOnload">
      {`if (location.hostname === ${host}) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag("js", new Date());
  gtag("config", ${id});
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + ${id};
  document.head.appendChild(s);
}`}
    </Script>
  );
}
