import { test, expect } from '../../fixtures/testFixtures';

test.describe('Products API tests', () => {
  test('GET products returns products data', async ({
    productsApi,
  }) => {
    const productsResponse = await productsApi.getProductsData();

    expect(productsResponse.products).toBeDefined();
    expect(productsResponse.products.length).toBeGreaterThan(0);
    expect(productsResponse.total).toBeGreaterThan(0);

    const firstProduct = productsResponse.products[0];

    expect(firstProduct.id).toBeDefined();
    expect(firstProduct.title).toBeDefined();
    expect(firstProduct.price).toBeGreaterThan(0);
  });

  test('GET specific product returns expected product data', async ({
    productsApi,
  }) => {
    const product = await productsApi.getProductDataById(1);

    expect(product.id).toBe(1);
    expect(product.title).toBeDefined();
    expect(product.price).toBeGreaterThan(0);
  });

test('POST product creates a new product', async ({
  productsApi,
}) => {
  const product = await productsApi.createProductData(
    'Playwright Test Product',
    99.99
  );

  expect(product.id).toBeDefined();
  expect(product.title).toBe('Playwright Test Product');
  expect(product.price).toBe(99.99);
});
});