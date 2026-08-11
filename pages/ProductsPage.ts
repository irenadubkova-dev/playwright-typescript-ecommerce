import { expect, Locator, Page } from "@playwright/test";
import { ProductCardComponent } from "../components/ProductCardComponent";

export class ProductsPage {
  private readonly pageTitle: Locator;
  private readonly productCards: Locator;
  private readonly sortDropdown: Locator;
  private readonly cartBadge: Locator;
  private readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.pageTitle = page.getByText("Products", { exact: true });
    this.productCards = page.locator('[data-test="inventory-item"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.pageTitle).toBeVisible();
  }

  async getProductCount(): Promise<number> {
    return this.productCards.count();
  }

  getProductByName(productName: string): ProductCardComponent {
    const productCard = this.productCards.filter({
      has: this.page.getByText(productName, { exact: true }),
    });

    return new ProductCardComponent(productCard);
  }

  getProductByIndex(index: number): ProductCardComponent {
    return new ProductCardComponent(this.productCards.nth(index));
  }

  async getAllProductNames(): Promise<string[]> {
    const names = await this.productCards
      .locator('[data-test="inventory-item-name"]')
      .allTextContents();

    return names.map((name) => name.trim());
  }

  async getAllProductPrices(): Promise<number[]> {
    const prices = await this.productCards
      .locator('[data-test="inventory-item-price"]')
      .allTextContents();

    return prices.map((price) => Number(price.replace("$", "").trim()));
  }

  async sortBy(option: string): Promise<void> {
    await this.sortDropdown.selectOption({
      label: option,
    });
  }

  async expectCartCount(expectedCount: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(expectedCount));
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async expectProductsDisplayed(): Promise<void> {
    await expect(this.productCards.first()).toBeVisible();
  }

  async expectProductCountGreaterThanZero(): Promise<void> {
    const count = await this.getProductCount();

    expect(count).toBeGreaterThan(0);
  }

  async expectProductsSortedByNameAscending(): Promise<void> {
    const actualNames = await this.getAllProductNames();
    const expectedNames = [...actualNames].sort();

    expect(actualNames).toEqual(expectedNames);
  }

  async expectProductsSortedByNameDescending(): Promise<void> {
    const actualNames = await this.getAllProductNames();
    const expectedNames = [...actualNames].sort().reverse();

    expect(actualNames).toEqual(expectedNames);
  }

  async expectProductsSortedByPriceAscending(): Promise<void> {
    const actualPrices = await this.getAllProductPrices();
    const expectedPrices = [...actualPrices].sort((a, b) => a - b);

    expect(actualPrices).toEqual(expectedPrices);
  }

  async expectProductsSortedByPriceDescending(): Promise<void> {
    const actualPrices = await this.getAllProductPrices();
    const expectedPrices = [...actualPrices].sort((a, b) => b - a);

    expect(actualPrices).toEqual(expectedPrices);
  }
}
