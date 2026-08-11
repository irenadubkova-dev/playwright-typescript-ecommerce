import { test, expect } from '@playwright/test';

test.describe('Products API tests', () => {
  test('GET products returns successful response with products', async ({
    request,
  }) => {
    const response = await request.get(
      'https://dummyjson.com/products'
    );

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.products).toBeDefined();
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('GET specific product returns expected product data', async ({
  request,
}) => {
  const response = await request.get(
    'https://dummyjson.com/products/1'
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(1);
  expect(body.title).toBeDefined();
  expect(body.price).toBeGreaterThan(0);
});

test('POST product creates a new product', async ({ request }) => {
  const response = await request.post(
    'https://dummyjson.com/products/add',
    {
      data: {
        title: 'Playwright Test Product',
        price: 99.99,
      },
    }
  );

  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(body.title).toBe('Playwright Test Product');
  expect(body.price).toBe(99.99);
  expect(body.id).toBeDefined();
});
});