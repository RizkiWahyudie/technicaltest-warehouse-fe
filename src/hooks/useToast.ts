import { toast, ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const useToast = () => {
  const showSuccess = (message: string, options: ToastOptions = {}) => {
    toast.success(message, { ...defaultOptions, ...options });
  };

  const showError = (message: string, options: ToastOptions = {}) => {
    toast.error(message, { ...defaultOptions, ...options });
  };

  const showInfo = (message: string, options: ToastOptions = {}) => {
    toast.info(message, { ...defaultOptions, ...options });
  };

  const showWarning = (message: string, options: ToastOptions = {}) => {
    toast.warn(message, { ...defaultOptions, ...options });
  };

  return { showSuccess, showError, showInfo, showWarning };
};
