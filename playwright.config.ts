import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: "html",

  use: {
    baseURL: process.env.BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "api",
      testMatch: /api\/.*\.spec\.ts/,
      use: {
        baseURL: process.env.API_BASE_URL,
      },
    },

    {
      name: "chromium",
      testIgnore: /api\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "firefox",
      testIgnore: /api\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Firefox"],
      },
    },

    {
      name: "webkit",
      testIgnore: /api\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],
});
