import { test } from '../fixtures/testFixtures';
import { users } from '../data/users';
import { products } from '../data/products';
import {
  checkoutData,
  checkoutNegativeTestData,
} from '../data/checkout';

test.describe('Checkout tests', () => {
  test.beforeEach(async ({ loginPage, productsPage }) => {
    await loginPage.navigate();

    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    await productsPage.expectLoaded();
  });

  test('user can complete checkout successfully', async ({
    productsPage,
    cartPage,
    checkoutPage,
  }) => {
    const product = productsPage.getProductByName(
      products.backpack.name
    );

    await product.addToCart();

    await productsPage.openCart();

    await cartPage.expectLoaded();

    await cartPage.checkout();

    await checkoutPage.fillCustomerDetails(
      checkoutData.validCustomer.firstName,
      checkoutData.validCustomer.lastName,
      checkoutData.validCustomer.postalCode
    );

    await checkoutPage.continue();

    await checkoutPage.finish();

    await checkoutPage.expectOrderCompleted();
  });

  checkoutNegativeTestData.forEach((checkoutCase) => {
  test(checkoutCase.testName, async ({
    productsPage,
    cartPage,
    checkoutPage,
  }) => {
    const product = productsPage.getProductByName(
      products.backpack.name
    );

    await product.addToCart();

    await productsPage.openCart();

    await cartPage.checkout();

    await checkoutPage.fillCustomerDetails(
      checkoutCase.firstName,
      checkoutCase.lastName,
      checkoutCase.postalCode
    );

    await checkoutPage.continue();

    await checkoutPage.expectErrorMessage(
      checkoutCase.error
    );
  });
});
});