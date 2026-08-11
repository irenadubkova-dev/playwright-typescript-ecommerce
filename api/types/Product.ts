export type Product = {
  id: number;
  title: string;
  price: number;
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type CreateProductResponse = {
  id: number;
  title: string;
  price: number;
};

export type CreateProductRequest = {
  title: string;
  price: number;
};