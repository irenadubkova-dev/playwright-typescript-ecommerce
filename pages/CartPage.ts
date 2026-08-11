import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;

  constructor(private readonly page: Page) {
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/cart/);
  }

  async getCartItemsCount(): Promise<number> {
    return this.cartItems.count();
  }

  async expectProductInCart(productName: string): Promise<void> {
    await expect(
      this.cartItems.filter({
        has: this.page.getByText(productName, { exact: true }),
      })
    ).toBeVisible();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async removeProduct(productName: string): Promise<void> {
  const product = this.cartItems.filter({
    has: this.page.getByText(productName, { exact: true }),
  });

  await product.getByRole('button', { name: 'Remove' }).click();
}
}