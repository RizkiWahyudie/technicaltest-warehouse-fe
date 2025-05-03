import { ProductType, ProductFormValues } from "@/types/product";
import { fetcher } from "@/utils/api";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export const getProducts = async (token: string): Promise<ProductType[]> => {
  return fetcher(API_URL, token);
};

export const createProduct = async (
  product: ProductFormValues,
  token: string
): Promise<ProductType> => {
  return fetcher(API_URL, token, {
    method: "POST",
    body: JSON.stringify(product),
  });
};

export const updateProduct = async (
  code: string,
  product: ProductFormValues,
  token: string
): Promise<ProductType> => {
  return fetcher(`${API_URL}/${code}`, token, {
    method: "PUT",
    body: JSON.stringify(product),
  });
};

export const deleteProduct = async (
  code: string,
  token: string
): Promise<void> => {
  return fetcher(`${API_URL}/${code}`, token, {
    method: "DELETE",
  });
};
