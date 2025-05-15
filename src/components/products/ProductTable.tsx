import { ProductType } from "@/types/product";
import Table from "../common/Table";
import Skeleton from "../common/Skeleton";
import EmptyState from "../common/EmptyState";

interface ProductTableProps {
  products: ProductType[];
  isLoading?: boolean;
  onEdit: (product: ProductType) => void;
  onDelete: (code: string) => void;
}

const ProductTable = ({
  products,
  isLoading = false,
  onEdit,
  onDelete,
}: ProductTableProps) => {
  const columns = [
    { header: "Kode", accessor: "code" },
    { header: "Nama", accessor: "name" },
    { header: "Kategori", accessor: "category" },
    {
      header: "Berat",
      accessor: "weight",
      render: (product: ProductType) => `${product.weight}`,
    },
    { header: "Satuan", accessor: "unit_of_measurement" },
    {
      header: "Aksi",
      accessor: "actions",
      render: (product: ProductType) => (
        <div className="flex space-x-3">
          <button
            onClick={() => onEdit(product)}
            className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
            aria-label={`Edit ${product.name}`}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product.code)}
            className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
            aria-label={`Delete ${product.name}`}
          >
            Hapus
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="Tidak ada produk"
        description="Tambahkan produk pertama Anda"
      />
    );
  }

  return <Table columns={columns} data={products} className="mt-4" />;
};

export default ProductTable;
