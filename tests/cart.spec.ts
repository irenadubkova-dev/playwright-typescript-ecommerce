import { test, expect } from '../fixtures/testFixtures';
import { users } from '../data/users';
import { products } from '../data/products';

test.describe('Cart tests', () => {
  test.beforeEach(async ({ loginPage, productsPage }) => {
    await loginPage.navigate();

    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    await productsPage.expectLoaded();
  });

  test('user can add a product and see it in the cart', async ({
    productsPage,
    cartPage,
  }) => {
    const product = productsPage.getProductByName(
      products.backpack.name
    );

    await product.addToCart();

    await productsPage.expectCartCount(1);

    await productsPage.openCart();

    await cartPage.expectLoaded();

    await cartPage.expectProductInCart(
      products.backpack.name
    );
  });
  
  test('user can remove a product from the cart', async ({
  productsPage,
  cartPage,
}) => {
  const product = productsPage.getProductByName(
    products.backpack.name
  );

  await product.addToCart();

  await productsPage.openCart();

  await cartPage.expectLoaded();

  await cartPage.removeProduct(
    products.backpack.name
  );

  const itemsCount = await cartPage.getCartItemsCount();

  expect(itemsCount).toBe(0);
});

test('user can add multiple products to the cart', async ({
  productsPage,
  cartPage,
}) => {
  const backpack = productsPage.getProductByName(
    products.backpack.name
  );

  const bikeLight = productsPage.getProductByName(
    products.bikeLight.name
  );

  await backpack.addToCart();
  await bikeLight.addToCart();

  await productsPage.expectCartCount(2);

  await productsPage.openCart();
  await cartPage.expectLoaded();

  await cartPage.expectProductInCart(
    products.backpack.name
  );

  await cartPage.expectProductInCart(
    products.bikeLight.name
  );

  const itemsCount = await cartPage.getCartItemsCount();

  expect(itemsCount).toBe(2);
});

});