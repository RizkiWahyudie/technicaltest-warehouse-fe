import { ProductType, ProductFormValues } from "@/types/product";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/api/products";
import useSWR from "swr";
import { useToast } from "./useToast";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export const useProducts = (token: string) => {
  const { showError, showSuccess } = useToast();
  const { data, error, mutate } = useSWR<ProductType[]>(
    token ? [API_URL, token] : null,
    () => getProducts(token)
  );

  const handleCreate = async (product: ProductFormValues) => {
    try {
      await createProduct(product, token);
      showSuccess("Product Successfully created!");
      mutate();
      return true;
    } catch (err) {
      const error = err as Error;
      showError(error.message);
      return false;
    }
  };

  const handleUpdate = async (code: string, product: ProductFormValues) => {
    try {
      await updateProduct(code, product, token);
      showSuccess("Product Successfully edited!");
      mutate();
      return true;
    } catch (err) {
      const error = err as Error;
      showError(error.message);
      return false;
    }
  };

  const handleDelete = async (code: string) => {
    try {
      await deleteProduct(code, token);
      showSuccess("Product Successfully deleted!");
      mutate();
      return true;
    } catch (err) {
      const error = err as Error;
      showError(error.message);
      return false;
    }
  };

  return {
    products: data || [],
    isLoading: !data && !error,
    error,
    createProduct: handleCreate,
    updateProduct: handleUpdate,
    deleteProduct: handleDelete,
  };
};
