import { Product } from "./Product";

export interface ProductsResponse {
  pagination: object;
  products: Product[];
}