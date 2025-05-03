import { toast } from "react-toastify";

interface ModalDeleteProps {
  show: boolean;
  onHide: () => void;
  productCode: string;
  onDelete: (code: string) => void;
}

const ModalDelete = ({ show, onHide, productCode, onDelete }: ModalDeleteProps) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5050/api/products/${productCode}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${document.cookie.split("token=")[1]}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to delete product.");
        return;
      }

      onDelete(productCode);
      toast.success("Product deleted successfully!");
      onHide();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product. Try again later.");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Delete Product</h2>
        <p className="mb-6">Are you sure you want to delete this product?</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onHide}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
