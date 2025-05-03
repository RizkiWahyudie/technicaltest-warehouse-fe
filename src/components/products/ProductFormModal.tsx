import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const productSchema = z.object({
  code: z.string().min(1, "Product code is required"),
  name: z.string().min(1, "Product name is required"),
  weight: z.string().min(1, "Product weight is required"),
  unit_of_measurement: z.string().min(1, "Unit of measurement is required"),
  category: z.string().min(1, "Category is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormModalProps {
  show: boolean;
  onHide: () => void;
  product?: unknown;
  onSave: (product: ProductFormData) => void;
}

const ProductFormModal = ({ show, onHide, product, onSave }: ProductFormModalProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialData, setInitialData] = useState<ProductFormData | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (product) {
      setInitialData(product);
      reset(product);
    }
  }, [product, reset]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      const method = product ? "PUT" : "POST";
      const url = product
        ? `http://localhost:5050/api/products/${product.code}`
        : `http://localhost:5050/api/products`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("token=")[1]}`,
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        toast.error(json.message || "Something went wrong");
        return;
      }

      onSave(data);
      toast.success(product ? "Product updated successfully" : "Product created successfully");
      onHide();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save product. Try again later.");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">{product ? "Edit Product" : "Create Product"}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {["code", "name", "weight", "unit_of_measurement", "category"].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium capitalize mb-1">
                {field.replace(/_/g, " ")}
              </label>
              <input
                {...register(field as keyof ProductFormData)}
                id={field}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder={field}
              />
              {errors[field as keyof ProductFormData] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field as keyof ProductFormData]?.message}
                </p>
              )}
            </div>
          ))}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            {product ? "Update Product" : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
