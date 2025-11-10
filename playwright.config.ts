import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 0,
  reporter: [
    ['list'],
    ['allure-playwright']
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://petstore.swagger.io/v2',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  }
});
