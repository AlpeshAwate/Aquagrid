// Analytics tracking
export const trackEvent = (category, action, label) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, { event_category: category, event_label: label });
  }
  console.log(`[Analytics] ${category} - ${action} - ${label}`);
};

// Performance monitoring
export const measurePerformance = (metricName, callback) => {
  const start = performance.now();
  const result = callback();
  const duration = performance.now() - start;
  console.log(`[Performance] ${metricName}: ${duration.toFixed(2)}ms`);
  return result;
};

// Number formatting per locale
export const formatNumber = (num, locale = 'en-IN') => {
  return new Intl.NumberFormat(locale).format(num);
};

// Date formatting per locale
export const formatDate = (date, locale = 'en-IN') => {
  return new Intl.DateTimeFormat(locale, { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(new Date(date));
};

// Generate static positions for map dots
export const generateMapPositions = (count) => {
  return Array.from({ length: count }, () => ({
    top: `${Math.random() * 80}%`,
    left: `${Math.random() * 90}%`,
    delay: `${Math.random() * 2}s`
  }));
};
