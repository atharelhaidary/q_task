import { FieldValues, UseFormSetError } from "react-hook-form";
import { TApiResponse } from "@/shared/types";

type ErrorHandlerProps = {
  response?: TApiResponse<any>;
  setError?: UseFormSetError<FieldValues>;
  showPopup?: (type: string, options?: any) => void;
};

export const handleApiError = ({response, setError,showPopup}: ErrorHandlerProps) => {

  const data = response?.data 
  const message = response?.message 
  
  if (data) {
    Object.entries(data).forEach(([keyParent, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (item && typeof item === "object") {
            Object.entries(item).forEach(([keyChild, errorMessage]) => {
              setError?.(`${keyParent}.[${index}].${keyChild}`, {
                type: "manual",
                message: errorMessage as string
              });
            });
            return;
          }
          if (item && typeof item === "string") {
            setError?.(`${keyParent}.[${index}]`, {
              type: "manual",
              message: item as string
            });
            return;
          }
        });
        return;
      }else if(typeof value === "object"){
          Object.entries(value).forEach(([keyChild, errorMessage]) => {
            setError?.(`${keyParent}.${keyChild}`, {
              type: "manual",
              message: errorMessage as string
            });
          });
          return;
      }
      setError?.(keyParent, {
        type: "manual",
        message: value as string
      });
    });
    return;
  }
  if (showPopup && message) {
    showPopup("error", { data: { message } });
  }
 
};