import { useState } from "react";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";

interface DeleteModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const DeleteModal = ({
  show,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Hapus",
  cancelText = "Batal",
}: DeleteModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsDeleting(true);
      await onConfirm();
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal show={show} onClose={onClose} title={title} size="md">
      <div className="space-y-6">
        <p className="text-gray-600">{message}</p>

        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirm}
            isLoading={isDeleting}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
