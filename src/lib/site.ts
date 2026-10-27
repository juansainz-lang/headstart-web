// Business-level settings in one place. Change these, not the components.

const contactEmail = "juan.sainz@headstartsales.com";
// Calendly event link (opens in the booking popup). The event itself stays in English.
// While empty, "Book a call" falls back to an email.
const calendlyUrl = "https://calendly.com/juan-sainz-headstartsales/30min";
// Google Analytics 4 measurement ID. Empty = no analytics.
const analyticsId = "G-KD2202FNHV";

export const site = {
  name: "Headstart",
  url: "https://headstartsales.com",
  contactEmail,
  calendlyUrl,
  analyticsId,
  // Every "Book a call" button points here and opens the booking popup.
  bookingUrl: calendlyUrl || `mailto:${contactEmail}?subject=Call%20with%20Headstart`,
};
