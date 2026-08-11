# Playwright TypeScript E-Commerce Automation

[![Playwright Tests](https://github.com/irenadubkova-dev/playwright-typescript-ecommerce/actions/workflows/playwright.yml/badge.svg)](https://github.com/irenadubkova-dev/playwright-typescript-ecommerce/actions/workflows/playwright.yml)

## Overview

This project is an end-to-end test automation framework built with Playwright and TypeScript.

It covers UI and API testing for an e-commerce flow, including login, product validation and sorting, cart operations, checkout scenarios, cross-browser execution, and CI integration with GitHub Actions.

---

## Technologies

- TypeScript
- Playwright
- Playwright Test
- Node.js
- GitHub Actions

---

## Project Structure

```text
playwright-typescript-ecommerce/
│
├── components/
│   └── ProductCardComponent.ts
│
├── data/
│   ├── users.ts
│   ├── loginTestData.ts
│   ├── products.ts
│   └── checkout.ts
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
- Validate response status codes
- Validate response body

---

## Framework Design

The project uses the Page Object Model (POM) to separate test logic from page implementation.

Reusable UI elements are represented as components, while Playwright custom fixtures provide page objects directly to the tests.

Test data is stored separately from the test files to support cleaner, reusable, and maintainable data-driven testing.

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

Run all tests:

```bash
npx playwright test
```

Run Chromium UI tests:

```bash
npx playwright test --project=chromium
```

Run Firefox UI tests:

```bash
npx playwright test --project=firefox
```

Run WebKit UI tests:

```bash
npx playwright test --project=webkit
```

Run API tests:

```bash
npx playwright test --project=api
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

---

## Reports

Playwright generates an HTML report for test execution.

Open the report locally with:

```bash
npx playwright show-report
```

Screenshots and videos are retained for failed tests, and traces are collected on the first retry.

---

## Continuous Integration

The project is integrated with GitHub Actions.

The complete automated test suite runs on every push and pull request to the `main` branch.

The CI pipeline:

1. Checks out the repository
2. Installs Node.js
3. Installs project dependencies
4. Installs Playwright browsers and required dependencies
5. Runs the complete Playwright test suite
6. Uploads the Playwright HTML report as an artifact

---

## Current Test Status

- 19 UI tests
- 3 API tests
- UI tests executed across Chromium, Firefox, and WebKit
- 60 automated test executions in a full run
- GitHub Actions CI passing

---

## Key Features

- Page Object Model
- Reusable component objects
- Custom Playwright fixtures
- Data-driven testing
- Positive and negative test scenarios
- End-to-end checkout flow
- API testing
- Cross-browser testing
- HTML reporting
- Screenshots and videos on failure
- Playwright traces
- GitHub Actions CI

---

## Author

Irina Dubkov