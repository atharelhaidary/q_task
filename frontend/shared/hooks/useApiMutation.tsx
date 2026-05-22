import {   UseMutationOptions, useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { FieldValues, UseFormSetError } from "react-hook-form";
import { AxiosError } from "axios";
import { usePopup } from "../context/PopupContext";
import { TApiResponse, TInvalidateQueries } from "@/shared/types";
import { handleApiError } from "../lib";

export type TConfig<TResponse = unknown, TRequest = unknown> = {
    invalidateQueries?: TInvalidateQueries<TResponse>;   
    setError?: UseFormSetError<FieldValues>;
    queryKey?: any[]; 
    onOptimisticUpdate?: boolean;
    updateData?: (oldData: any, variables: TRequest) => any;
}

export type ApiAxiosError<T = unknown> = AxiosError<TApiResponse<T>>;

type TProps<TResponse,TRequest,TErrorData> = {
    func : (variables : TRequest) => Promise<TResponse>
    config?: TConfig<TResponse> & Omit<UseMutationOptions<TResponse, ApiAxiosError<TErrorData>,TRequest>, 'mutationKey' | 'mutationFn'>
}


export const useApiMutaion = <TResponse extends { message?: string; data?: unknown } ,TRequest  =  Record<string, any> , TErrorData = unknown> ({func,config}:TProps<TResponse,TRequest,TErrorData>) => {
    const {  hidePopup , showPopup } = usePopup()
    const { onSuccess: configOnSuccess,
         onError: configOnError,
          onSettled: configOnSettled ,
          setError :configSetError,
          invalidateQueries: configInvalidateQueries ,
          queryKey, 
          onOptimisticUpdate,
          updateData,
          ...restConfig } =  config ||  {}
    const queryClient = useQueryClient();
    let previousData: unknown = null;
    return useMutation<TResponse,ApiAxiosError<TErrorData>,TRequest>({
        mutationFn : func,
        onMutate: async (variables: TRequest) => {
            if (queryKey && onOptimisticUpdate) {
                
                previousData = queryClient.getQueryData(queryKey);
                
                if (updateData) {
                    queryClient.setQueryData(queryKey, (old: any) => {
                        return updateData(old, variables);
                    });
                }
            }
            
            return { previousData };
        },
        onSuccess : (data, variables , onMutateResult , context ) => {
            //automatic update
            if (configInvalidateQueries) {
                    let queries: TInvalidateQueries<TResponse>

                    if (typeof configInvalidateQueries === 'function') {
                        queries = configInvalidateQueries(data);
                    } else {
                        queries = configInvalidateQueries;
                    }

                    queries.forEach((queryKey) => {
                        queryClient.invalidateQueries({ queryKey});
                    });
            }
            
            if(configOnSuccess){
                configOnSuccess?.(data, variables, onMutateResult, context)

            }
        },
        onError : (error , variables  , onMutateResult , context ) => {
            if (queryKey && onOptimisticUpdate && previousData) {
                queryClient.setQueryData(queryKey, previousData);
            }
            const response = error.response?.data as TApiResponse<TErrorData>
            handleApiError({
                response,
                setError : configSetError,
                showPopup
            })
            configOnError?.(error,variables,onMutateResult,context)
        },
        onSettled : (data , error , variables , onMutateResult , context )=>{
            hidePopup("loading");
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            if(configOnSettled){
                configOnSettled?.(data,error,variables, onMutateResult, context)
            }
        },
        ...restConfig
    })

}










