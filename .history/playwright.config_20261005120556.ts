import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', { resultsDir: 'allure-results' }],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    headless: process.env.CI === 'true',
  },
  projects: [
  {
    name: 'setup',
    testMatch: /.*\.setup\.ts/,
  },
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'], 
      storageState: 'playwright/.auth/user.json' },
      dependencies: ['setup'],
  },
  // {
  //   name: 'firefox',
  //   use: { ...devices['Desktop Firefox'], storageState: 'playwright/.auth/user.json' },
  //   dependencies: ['setup'],
  // },
  // {
  //   name: 'webkit',
  //   use: { ...devices['Desktop Safari'], storageState: 'playwright/.auth/user.json' },
  //   dependencies: ['setup'],
  // },
],


});
