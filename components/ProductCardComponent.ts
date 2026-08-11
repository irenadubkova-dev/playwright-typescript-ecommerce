import { Locator } from "@playwright/test";

export class ProductCardComponent {
  private readonly name: Locator;
  private readonly price: Locator;
  private readonly addToCartButton: Locator;

  constructor(private readonly root: Locator) {
    this.name = root.locator('[data-test="inventory-item-name"]');
    this.price = root.locator('[data-test="inventory-item-price"]');
    this.addToCartButton = root.getByRole("button", { name: "Add to cart" });
  }

  async getName(): Promise<string> {
    return (await this.name.textContent())?.trim() ?? "";
  }

  async getPrice(): Promise<number> {
    const priceText = await this.price.textContent();

    if (!priceText) {
      throw new Error("Product price was not found");
    }

    return Number(priceText.replace("$", ""));
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async open(): Promise<void> {
    await this.name.click();
  }
}
