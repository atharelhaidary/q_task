import { TApiResponse } from "../../../shared/types";
import { usePopup } from "../context";
import { FieldValues, UseFormSetError } from "react-hook-form";
import { handleApiError } from "../lib";

type TUseApiActionProps<T>= {
    setError?:UseFormSetError<FieldValues>;
    onSuccess?: (response:TApiResponse<T>) =>void
    onError?: (response:TApiResponse<T>) => void;
    onSettled?: () => void;
}
export function useApiResponse<T>({setError, onSuccess, onError,onSettled} : TUseApiActionProps<T>)  {
    const {  hidePopup , showPopup } = usePopup()

    const handleApiResponse = async ( response : TApiResponse<T>) => {
        hidePopup("loading");
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        if(onSettled){
            onSettled()
        }
        // success
        if(response.success){
                if(onSuccess){
                    onSuccess(response)
                }
                return response
        }
        // failed
        else if(!response.success){
            if(onError){
                onError(response)
            }
            handleApiError({
                response,
                setError,
                showPopup
           })
         return response
        }
    }
    return{
        handleApiResponse
    }
}
