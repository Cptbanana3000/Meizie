import { useState, useEffect } from 'react';

const MAX_FREE_USES = 3;

// Simple analytics tracking
const trackEvent = (eventName, eventData = {}) => {
  // In a real app, you would send this to your analytics service
  // For now we'll just log to console
  console.log(`[Analytics] ${eventName}`, eventData);
  
  // Mock Google Analytics
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData
    });
  }
};

// Add this to index.html in production
const initAnalytics = () => {
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
};

export function useUsageTracker() {
  const [usageCount, setUsageCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  
  // Initialize analytics and load usage data from localStorage on component mount
  useEffect(() => {
    initAnalytics();
    
    const storedCount = localStorage.getItem('captionGeneratorUsage');
    if (storedCount) {
      const count = parseInt(storedCount, 10);
      setUsageCount(count);
      
      // Show paywall if usage exceeds the free limit
      if (count >= MAX_FREE_USES) {
        setShowPaywall(true);
        trackEvent('paywall_shown');
      }
    }
    
    // Track page view
    trackEvent('page_view', { 
      page: 'caption_generator',
      usageCount: storedCount || 0
    });
  }, []);
  
  // Track a new usage
  const trackUsage = () => {
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem('captionGeneratorUsage', newCount.toString());
    
    // Track the generation event
    trackEvent('caption_generated', { 
      count: newCount,
      remaining: Math.max(0, MAX_FREE_USES - newCount)
    });
    
    // Show paywall after exceeding free uses
    if (newCount >= MAX_FREE_USES) {
      setShowPaywall(true);
      trackEvent('paywall_shown');
      return false; // Return false to indicate generation should be blocked
    }
    
    return true; // Return true to indicate generation is allowed
  };
  
  // Hide the paywall temporarily 
  const dismissPaywall = () => {
    setShowPaywall(false);
    trackEvent('paywall_dismissed');
    
    // Re-show after some time
    setTimeout(() => {
      setShowPaywall(true);
    }, 5 * 60 * 1000); // 5 minutes
  };
  
  return {
    usageCount,
    showPaywall,
    trackUsage,
    dismissPaywall,
    isFreeTier: usageCount < MAX_FREE_USES,
    remainingUses: Math.max(0, MAX_FREE_USES - usageCount)
  };
} 