import { APIRequestContext, APIResponse } from "@playwright/test";

import {
  Product,
  ProductsResponse,
  CreateProductRequest,
  CreateProductResponse,
} from "./types/Product";

export class ProductsApi {
  constructor(private readonly request: APIRequestContext) {}

  async getProducts(): Promise<APIResponse> {
    return this.request.get("/products");
  }

  async getProductById(productId: number): Promise<APIResponse> {
    return this.request.get(`/products/${productId}`);
  }

  async createProduct(productData: CreateProductRequest): Promise<APIResponse> {
    return this.request.post("/products/add", {
      data: productData,
    });
  }

  async getProductsData(): Promise<ProductsResponse> {
    const response = await this.getProducts();

    if (!response.ok()) {
      throw new Error(`GET /products failed with status ${response.status()}`);
    }

    return response.json() as Promise<ProductsResponse>;
  }

  async getProductDataById(productId: number): Promise<Product> {
    const response = await this.getProductById(productId);

    if (!response.ok()) {
      throw new Error(
        `GET /products/${productId} failed with status ${response.status()}`,
      );
    }

    return response.json() as Promise<Product>;
  }

  async createProductData(
    productData: CreateProductRequest,
  ): Promise<CreateProductResponse> {
    const response = await this.createProduct(productData);

    if (!response.ok()) {
      throw new Error(
        `POST /products/add failed with status ${response.status()}`,
      );
    }

    return response.json() as Promise<CreateProductResponse>;
  }
}
