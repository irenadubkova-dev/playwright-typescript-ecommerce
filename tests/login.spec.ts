import { test } from "../fixtures/testFixtures";
import { loginTestData } from "../data/loginTestData";

test.describe("Login tests", () => {
  loginTestData.forEach((user) => {
    test(user.testName, async ({ loginPage }) => {
      await loginPage.navigate();
      await loginPage.login(user.username, user.password);

      if (user.success) {
        await loginPage.expectSuccessfulLogin();
      } else if (user.error) {
        await loginPage.expectErrorMessage(user.error);
      }
    });
  });
});
