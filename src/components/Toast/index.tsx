import { ReactNode } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

type ToastContent = ReactNode | string;

export const toastr = {
  dismiss() {
    toast.dismiss();
  },
  success(text: ToastContent) {
    toast.success(text);
  },
  info(text: ToastContent) {
    toast.info(text);
  },
  warn(text: ToastContent) {
    toast.warn(text);
  },
  error(text: ToastContent) {
    toast.error(text);
  },
};
