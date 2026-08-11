import { test, expect } from '../../fixtures/testFixtures';

test.describe('Products API tests', () => {
  test('GET products returns successful response with products', async ({
    productsApi,
  }) => {
    const response = await productsApi.getProducts();

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.products).toBeDefined();
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('GET specific product returns expected product data', async ({
    productsApi,
  }) => {
    const response = await productsApi.getProductById(1);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(1);
    expect(body.title).toBeDefined();
    expect(body.price).toBeGreaterThan(0);
  });

  test('POST product creates a new product', async ({
    productsApi,
  }) => {
    const response = await productsApi.createProduct(
      'Playwright Test Product',
      99.99
    );

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.title).toBe('Playwright Test Product');
    expect(body.price).toBe(99.99);
    expect(body.id).toBeDefined();
  });
});