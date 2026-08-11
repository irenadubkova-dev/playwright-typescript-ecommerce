import { APIRequestContext, APIResponse } from '@playwright/test';

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
}