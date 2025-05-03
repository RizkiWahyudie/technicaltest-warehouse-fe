import { useState } from "react";
import Modal from "@/components/common/Modal";
import ProductForm from "./ProductForm";
import { ProductType, ProductFormValues } from "@/types/product";

interface ProductModalProps {
  show: boolean;
  onClose: () => void;
  product?: ProductType | null;
  onSave: (values: ProductFormValues) => Promise<void>;
}

const ProductModal = ({
  show,
  onClose,
  product,
  onSave,
}: ProductModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      setIsSubmitting(true);
      await onSave(values);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={product ? "Edit Produk" : "Tambah Produk"}
      size="lg"
    >
      <ProductForm
        onSubmit={handleSubmit}
        defaultValues={product || undefined}
        isLoading={isSubmitting}
      />
    </Modal>
  );
};

export default ProductModal;
