/**
 * Analytics Configuration Test Utility
 * 
 * This file helps you verify that Google Analytics is properly configured.
 * Import and run this in your browser console to test the setup.
 */

// Test if GA is initialized
export function testGAInitialization() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  console.group('🔍 Google Analytics Configuration Test');
  
  // Check if measurement ID is set
  if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
    console.error('❌ FAIL: GA Measurement ID not configured');
    console.log('Solution: Update your .env file with a valid GA4 Measurement ID');
    console.groupEnd();
    return false;
  }
  
  console.log(`✅ PASS: Measurement ID found: ${measurementId}`);
  
  // Check if ReactGA is loaded
  if (typeof window.gtag === 'undefined') {
    console.warn('⚠️  WARNING: Google Analytics script not loaded yet');
    console.log('This might be normal if GA is loading asynchronously');
  } else {
    console.log('✅ PASS: Google Analytics script loaded');
  }
  
  console.log('\n📊 Next steps:');
  console.log('1. Open Google Analytics: https://analytics.google.com/');
  console.log('2. Go to Reports → Realtime');
  console.log('3. Interact with the quiz (start, answer questions)');
  console.log('4. Watch for events appearing in GA4 Realtime reports');
  
  console.groupEnd();
  return true;
}

// Test custom event tracking
export function testEventTracking() {
  console.group('🎯 Testing Custom Event Tracking');
  
  const testEvents = [
    'quiz_start',
    'correct_answer',
    'incorrect_answer',
    'quiz_complete',
    'level_progress',
    'reward_earned'
  ];
  
  console.log('📋 Events that should be tracked:');
  testEvents.forEach(event => {
    console.log(`  • ${event}`);
  });
  
  console.log('\n🧪 To test:');
  console.log('1. Complete a full quiz session');
  console.log('2. Answer both correct and incorrect questions');
  console.log('3. Earn rewards (coins/diamonds)');
  console.log('4. Check GA4 Reports → Engagement → Events');
  
  console.groupEnd();
}

// Test environment configuration
export function testEnvironment() {
  console.group('⚙️  Environment Configuration Test');
  
  const isDev = import.meta.env.DEV;
  const isProd = import.meta.env.PROD;
  const baseUrl = import.meta.env.BASE_URL;
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  console.table({
    'Development Mode': isDev,
    'Production Mode': isProd,
    'Base URL': baseUrl,
    'GA Measurement ID': measurementId || 'NOT SET',
    'GA Configured': measurementId && measurementId !== 'G-XXXXXXXXXX' ? 'Yes' : 'No'
  });
  
  if (isDev) {
    console.log('\n💡 You are in development mode');
    console.log('Events will be tracked if GA Measurement ID is configured');
  }
  
  if (isProd) {
    console.log('\n🚀 You are in production mode');
    console.log('Make sure your deployment platform has VITE_GA_MEASUREMENT_ID set');
  }
  
  console.groupEnd();
}

// Run all tests
export function runAllTests() {
  console.clear();
  console.log('🧪 Running Google Analytics Configuration Tests\n');
  
  testEnvironment();
  console.log('');
  testGAInitialization();
  console.log('');
  testEventTracking();
  
  console.log('\n✅ Tests complete! Check the output above for any issues.\n');
}

// Auto-run tests only in development
if (import.meta.env.DEV) {
  // Uncomment the line below to run tests automatically in dev mode
  // setTimeout(runAllTests, 1000);
}

// Export for manual testing
if (typeof window !== 'undefined') {
  window.testGA = {
    runAllTests,
    testGAInitialization,
    testEventTracking,
    testEnvironment
  };
  
  console.log('💡 Analytics test utilities available!');
  console.log('Run window.testGA.runAllTests() in console to test your setup');
}
