import { test } from '../fixtures/testFixtures';
import { loginTestData } from '../data/loginTestData';

test.describe('Login tests', () => {
  loginTestData.forEach((user) => {
    test(user.testName, async ({ loginPage, productsPage }) => {
      await loginPage.navigate();
      await loginPage.login(user.username, user.password);

      if (user.success) {
        await productsPage.expectLoaded();
      } else {
        await loginPage.expectErrorMessage(user.error!);
      }
    });
  });
});