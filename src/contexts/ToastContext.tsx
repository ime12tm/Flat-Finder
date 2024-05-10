import { createContext, useContext, ReactNode } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: ReactNode | undefined }) => {
  const showToast = (message: string, options?: ToastOptions) => toast(message, options);

  const toastSuccess = (message: string, options?: ToastOptions) => showToast(message, { ...options, type: "success" });
  const toastError = (message: string, options?: ToastOptions) => showToast(message, { ...options, type: "error" });
  const toastWarning = (message: string, options?: ToastOptions) => showToast(message, { ...options, type: "warning" });
  const toastInfo = (message: string, options?: ToastOptions) => showToast(message, { ...options, type: "info" });

  // interface ToastContextType {
  //   toastSuccess: (message: string, options?: ToastOptions) => void;
  //   toastError: (message: string, options?: ToastOptions) => void;
  //   toastWarning: (message: string, options?: ToastOptions) => void;
  //   toastInfo: (message: string, options?: ToastOptions) => void;
  // }

  // const ToastContext = createContext<ToastContextType | undefined>(undefined);

  // export const useToast = () => {
  //   const context = useContext(ToastContext);
  //   if (!context) {
  //     throw new Error("useToast must be used within a ToastProvider");
  //   }
  //   return context;
  // };

  return (
    <ToastContext.Provider value={{ toastSuccess, toastError, toastWarning, toastInfo }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};
