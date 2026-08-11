import { APIRequestContext, APIResponse } from '@playwright/test';
import {
  Product,
  ProductsResponse,
  CreateProductResponse,
} from './types/Product';

export class ProductsApi {
  constructor(private readonly request: APIRequestContext) {}

  async getProducts(): Promise<APIResponse> {
    return this.request.get('/products');
  }

  async getProductById(productId: number): Promise<APIResponse> {
    return this.request.get(`/products/${productId}`);
  }

  async createProduct(
    title: string,
    price: number
  ): Promise<APIResponse> {
    return this.request.post('/products/add', {
      data: {
        title,
        price,
      },
    });
  }

  async getProductsData(): Promise<ProductsResponse> {
    const response = await this.getProducts();

    return response.json() as Promise<ProductsResponse>;
  }

  async getProductDataById(productId: number): Promise<Product> {
    const response = await this.getProductById(productId);

    return response.json() as Promise<Product>;
  }

  async createProductData(
  title: string,
  price: number
): Promise<CreateProductResponse> {
  const response = await this.createProduct(title, price);

  return response.json() as Promise<CreateProductResponse>;
}
}