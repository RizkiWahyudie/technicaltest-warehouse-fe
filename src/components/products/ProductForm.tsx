import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormValues, productSchema } from "@/types/product";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

interface ProductFormProps {
  onSubmit: (values: ProductFormValues) => void;
  defaultValues?: Partial<ProductFormValues>;
  isLoading?: boolean;
}

const ProductForm = ({
  onSubmit,
  defaultValues,
  isLoading,
}: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Kode Produk"
        id="code"
        {...register("code")}
        error={errors.code?.message}
      />
      
      <Input
        label="Nama Produk"
        id="name"
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        label="Deskripsi"
        id="description"
        {...register("description")}
        error={errors.description?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Berat (kg)"
          id="weight"
          type="number"
          step="0.01"
          {...register("weight")}
          error={errors.weight?.message}
        />

        <Input
          label="Satuan"
          id="unit_of_measurement"
          {...register("unit_of_measurement")}
          error={errors.unit_of_measurement?.message}
        />
      </div>

      <Input
        label="Kategori"
        id="category"
        {...register("category")}
        error={errors.category?.message}
      />

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="w-full md:w-auto"
        >
          Simpan
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
