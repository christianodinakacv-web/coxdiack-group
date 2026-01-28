// src/utils/analytics.js

// Meta Pixel event
export const trackMetaEvent = (eventName, params = {}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", eventName, params);
  }
};

// Google Analytics 4 event
export const trackGAEvent = (eventName, params = {}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
};

// Unified tracker (recommended)
export const trackEvent = (eventName, params = {}) => {
  trackMetaEvent(eventName, params);
  trackGAEvent(eventName, params);
};
