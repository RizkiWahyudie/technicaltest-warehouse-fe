import { useEffect } from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const Modal = ({ show, onClose, title, children, size = "md" }: ModalProps) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  if (!show) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div className="fixed inset-0">
      <div
        className="absolute inset-0 bg-gray-500 opacity-75"
        onClick={onClose}
      ></div>

      <div
        className={`z-50 absolute top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg text-left overflow-hidden shadow-xl transition-all sm:my-8 sm:align-middle ${sizeClasses[size]} w-full`}
      >
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            {title}
          </h3>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
