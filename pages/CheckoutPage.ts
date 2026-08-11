import { expect, Locator, Page } from "@playwright/test";

export class CheckoutPage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly finishButton: Locator;
  private readonly completeMessage: Locator;
  private readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    this.firstNameInput = page.getByPlaceholder("First Name");
    this.lastNameInput = page.getByPlaceholder("Last Name");
    this.postalCodeInput = page.getByPlaceholder("Zip/Postal Code");

    this.continueButton = page.getByRole("button", {
      name: "Continue",
    });

    this.finishButton = page.getByRole("button", {
      name: "Finish",
    });

    this.completeMessage = page.getByText("Thank you for your order!");

    this.errorMessage = page.locator('[data-test="error"]');
  }

  async fillCustomerDetails(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async expectOrderCompleted(): Promise<void> {
    await expect(this.completeMessage).toBeVisible();
  }

  async expectErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}
