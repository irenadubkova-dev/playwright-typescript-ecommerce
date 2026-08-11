import { test, expect } from '../fixtures/testFixtures';
import { users } from '../data/users';
import { products } from '../data/products';

test.describe('Products tests', () => {
  test.beforeEach(async ({ loginPage, productsPage }) => {
    await loginPage.navigate();

    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    await productsPage.expectLoaded();
  });

  test('products are displayed after login', async ({ productsPage }) => {
    const productCount = await productsPage.getProductCount();

    expect(productCount).toBeGreaterThan(0);
  });

  test('user can add a product to the cart', async ({ productsPage }) => {
    const product = productsPage.getProductByName(
      products.backpack.name
    );

    await product.addToCart();

    await productsPage.expectCartCount(1);
  });

  test('product contains a valid name and price', async ({
    productsPage,
  }) => {
    const firstProduct = productsPage.getProductByIndex(0);

    const productName = await firstProduct.getName();
    const productPrice = await firstProduct.getPrice();

    expect(productName).not.toBe('');
    expect(productPrice).toBeGreaterThan(0);
  });

  test('products can be sorted by name A to Z', async ({ productsPage }) => {
  await productsPage.sortBy('Name (A to Z)');

  const actualNames = await productsPage.getAllProductNames();

  const expectedNames = [...actualNames].sort();

  expect(actualNames).toEqual(expectedNames);
});

test('products can be sorted by name Z to A', async ({ productsPage }) => {
  await productsPage.sortBy('Name (Z to A)');

  const actualNames = await productsPage.getAllProductNames();

  const expectedNames = [...actualNames].sort().reverse();

  expect(actualNames).toEqual(expectedNames);
});

test('products can be sorted by price low to high', async ({ productsPage }) => {
  await productsPage.sortBy('Price (low to high)');

  const actualPrices = await productsPage.getAllProductPrices();

  const expectedPrices = [...actualPrices].sort((a, b) => a - b);

  expect(actualPrices).toEqual(expectedPrices);
});

test('products can be sorted by price high to low', async ({ productsPage }) => {
  await productsPage.sortBy('Price (high to low)');

  const actualPrices = await productsPage.getAllProductPrices();

  const expectedPrices = [...actualPrices].sort((a, b) => b - a);

  expect(actualPrices).toEqual(expectedPrices);
});
});