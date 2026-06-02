import { defineConfig, devices } from '@playwright/test';

// 1. Create a dictionary of target environments
const ENV_URLS : Record<string, string> = {
  qa: 'https://eventhub.rahulshettyacademy.com',
  staging: 'https://eventhub.rahulshettyacademy.com',
  prod: 'https://eventhub.rahulshettyacademy.com',
};

// # Runs against QA (by default)
// npx playwright test

// # Runs against Staging
// TEST_ENV=staging npx playwright test

// # Runs against Production
// TEST_ENV=prod npx playwright test
const targetEnv = process.env.TEST_ENV || 'qa';


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  timeout: 30 * 1000, // 30 seconds

   expect: {
    // 4. Assertion Timeout: Max time expect() waits for a condition to be met
    timeout: 5 * 1000, // 5 seconds
  },
  use: {
    baseURL: ENV_URLS[targetEnv],
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',

     // Action Timeout: Max time locator actions (e.g., .click(), .fill()) wait
    actionTimeout: 10 * 1000, // 10 seconds

    // Navigation Timeout: Max time page.goto() or page.waitForURL() waits
    navigationTimeout: 15 * 1000, // 15 seconds
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
