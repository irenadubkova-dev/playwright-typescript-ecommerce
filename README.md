# Playwright TypeScript E-Commerce Automation

[![Playwright Tests](https://github.com/irenadubkova-dev/playwright-typescript-ecommerce/actions/workflows/playwright.yml/badge.svg)](https://github.com/irenadubkova-dev/playwright-typescript-ecommerce/actions/workflows/playwright.yml)

## Overview

This project is an end-to-end test automation framework built with Playwright and TypeScript.

It covers UI and API testing for an e-commerce flow, including login, product validation and sorting, cart operations, checkout scenarios, cross-browser execution, environment-based configuration, and CI integration with GitHub Actions.

---

## Technologies

- TypeScript
- Playwright
- Playwright Test
- Node.js
- GitHub Actions
- dotenv

---

## Project Structure

```text
playwright-typescript-ecommerce/
│
├── api/
│   ├── ProductsApi.ts
│   └── types/
│       └── Product.ts
│
├── components/
│   └── ProductCardComponent.ts
│
├── data/
│   ├── users.ts
│   ├── loginTestData.ts
│   ├── products.ts
│   ├── checkout.ts
│   └── apiProducts.ts
│
├── fixtures/
│   └── testFixtures.ts
│
├── pages/
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── tests/
│   ├── api/
│   │   └── productsApi.spec.ts
│   │
│   ├── login.spec.ts
│   ├── products.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

---

## Test Coverage

### Login

- Successful login
- Invalid username and password
- Missing username
- Missing password
- Valid username with invalid password
- Data-driven login scenarios

### Products

- Verify products are displayed
- Validate product name and price
- Add product to cart
- Sort products by name A-Z
- Sort products by name Z-A
- Sort products by price low to high
- Sort products by price high to low

### Cart

- Add product to cart
- Remove product from cart
- Add multiple products
- Validate cart badge count
- Validate selected products in the cart

### Checkout

- Complete checkout successfully
- Missing first name
- Missing last name
- Missing postal code
- Data-driven negative checkout scenarios

### API

- GET all products
- GET specific product
- POST new product
- Validate product response data
- Typed API requests
- Typed API responses

---

## Framework Design

The project uses the Page Object Model (POM) to separate test logic from page implementation.

Reusable UI elements are represented as components, while Playwright custom fixtures provide page objects directly to the tests.

Test data is stored separately from the test files to support cleaner, reusable, and maintainable data-driven testing.

The API layer is separated from the test logic through dedicated service classes.

API request and response models are typed with TypeScript to improve maintainability, reduce runtime mistakes, and provide compile-time validation.

Environment-specific URLs are managed through environment variables using `.env` files, while `.env.example` documents the required configuration.

### UI Architecture

```text
UI Test
   ↓
Fixture
   ↓
Page Object
   ↓
Component
   ↓
Browser
```

### API Architecture

```text
API Test
   ↓
Fixture
   ↓
ProductsApi
   ↓
Typed Request / Response
   ↓
HTTP API
```

---

## Environment Configuration

The project uses environment variables for application and API URLs.

Create a local `.env` file from the provided example:

```bash
cp .env.example .env
```

The environment configuration contains:

```env
BASE_URL=https://www.saucedemo.com
API_BASE_URL=https://dummyjson.com
```

The local `.env` file is excluded from Git, while `.env.example` is included in the repository to document the required variables.

---

## Cross-Browser Testing

UI tests run across:

- Chromium
- Firefox
- WebKit

API tests run once in a dedicated API project and are not repeated for each browser.

---

## Running the Tests

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

Run the complete test suite:

```bash
npm test
```

Run Chromium UI tests:

```bash
npm run test:chromium
```

Run Firefox UI tests:

```bash
npm run test:firefox
```

Run WebKit UI tests:

```bash
npm run test:webkit
```

Run API tests:

```bash
npm run test:api
```

Run tests in headed mode:

```bash
npm run test:headed
```

Open Playwright UI mode:

```bash
npm run test:ui
```

Run TypeScript type checking:

```bash
npm run typecheck
```

---

## Reports

Playwright generates an HTML report for test execution.

Open the report locally with:

```bash
npm run report
```

The framework is configured to retain useful debugging information for failed tests, including screenshots and videos.

Playwright traces are collected on the first retry.

---

## Continuous Integration

The project is integrated with GitHub Actions.

The complete automated test suite runs on every push and pull request to the `main` branch.

The CI pipeline:

1. Checks out the repository
2. Installs Node.js
3. Installs project dependencies
4. Runs TypeScript type checking
5. Installs Playwright browsers and required dependencies
6. Runs the complete Playwright test suite
7. Uploads the Playwright HTML report as an artifact

Environment variables required by the tests are configured in the CI workflow.

---

## Current Test Status

- 19 UI tests
- 3 API tests
- UI tests executed across Chromium, Firefox, and WebKit
- 60 automated test executions in a complete run
- GitHub Actions CI passing

---

## Key Features

- Page Object Model (POM)
- Reusable component objects
- Custom Playwright fixtures
- Data-driven testing
- Separation of test data from test logic
- Positive and negative test scenarios
- End-to-end checkout flow
- API testing
- Dedicated API service layer
- Typed API request models
- Typed API response models
- Environment-based configuration
- Cross-browser testing
- TypeScript type checking
- HTML reporting
- Screenshots and videos on failure
- Playwright traces
- GitHub Actions CI

---

## Author

Irina Dubkov
