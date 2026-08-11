import { test } from "../fixtures/testFixtures";
import { users } from "../data/users";
import { checkoutData, checkoutNegativeTestData } from "../data/checkout";

test.describe("Checkout tests", () => {
  test.beforeEach(async ({ loginPage, productsPage, cartPage }) => {
    await loginPage.navigate();

    await loginPage.login(users.standard.username, users.standard.password);

    await productsPage.expectLoaded();

    const product = productsPage.getProductByIndex(0);

    await product.addToCart();
    await productsPage.expectCartCount(1);

    await productsPage.openCart();
    await cartPage.expectLoaded();

    await cartPage.checkout();
  });

  test("user can complete checkout successfully", async ({ checkoutPage }) => {
    await checkoutPage.fillCustomerDetails(
      checkoutData.validCustomer.firstName,
      checkoutData.validCustomer.lastName,
      checkoutData.validCustomer.postalCode,
    );

    await checkoutPage.continue();
    await checkoutPage.finish();

    await checkoutPage.expectOrderCompleted();
  });

  checkoutNegativeTestData.forEach((checkoutCase) => {
    test(checkoutCase.testName, async ({ checkoutPage }) => {
      await checkoutPage.fillCustomerDetails(
        checkoutCase.firstName,
        checkoutCase.lastName,
        checkoutCase.postalCode,
      );

      await checkoutPage.continue();

      await checkoutPage.expectErrorMessage(checkoutCase.error);
    });
  });
});
