import { UseMutationOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues, UseFormSetError } from "react-hook-form";
import { AxiosError } from "axios";
import { usePopup } from "../context/PopupContext";
import { TApiResponse, TInvalidateQueries } from "@/shared/types";
import { handleApiError } from "../lib";

export type ApiAxiosError<T = unknown> = AxiosError<TApiResponse<T>>;
type TMutationContext = { previousData: unknown; currentQueryKey: any[] }

export type TConfig<TResponse = unknown, TRequest = unknown> = {
    invalidateQueries?: TInvalidateQueries<TResponse>;
    setError?: UseFormSetError<FieldValues>;
    queryKey?: any[]
    onOptimisticUpdate?: boolean;
    updateData?: (oldData: any, variables: TRequest) => any;
    onSuccess?: (data: TResponse, variables: TRequest, context: TMutationContext) => void;
    onError?: (error: ApiAxiosError, variables: TRequest, context: TMutationContext) => void;
    onSettled?: (data: TResponse | undefined, error: ApiAxiosError | null, variables: TRequest, context: TMutationContext) => void;
}

type TProps<TResponse, TRequest, TErrorData> = {
    func: (variables: TRequest) => Promise<TResponse>;
    config?: TConfig<TResponse, TRequest> & Omit<UseMutationOptions<TResponse, ApiAxiosError<TErrorData>, TRequest, TMutationContext>, 'mutationKey' | 'mutationFn' | 'onSuccess' | 'onError' | 'onSettled'>;
}

export const useApiMutaion = <TResponse extends { message?: string; data?: unknown }, TRequest = Record<string, any>, TErrorData = unknown>({ func, config }: TProps<TResponse, TRequest, TErrorData>) => {
    const { hidePopup, showPopup } = usePopup();
    const queryClient = useQueryClient();
    const {
        onSuccess: configOnSuccess,
        onError: configOnError,
        onSettled: configOnSettled,
        setError: configSetError,
        invalidateQueries: configInvalidateQueries,
        onOptimisticUpdate,
        updateData,
        queryKey,
        ...restConfig
    } = config || {};


    return useMutation<TResponse, ApiAxiosError<TErrorData>, TRequest, TMutationContext>({
        mutationFn: func,

        onMutate: async (variables): Promise<TMutationContext> => {
            const currentQueryKey = queryKey;
            let previousData = undefined;

            if (currentQueryKey.length > 0 && onOptimisticUpdate && updateData ) {
                await queryClient.cancelQueries({ queryKey: currentQueryKey });
                previousData = queryClient.getQueryData(currentQueryKey);
                if (updateData) {
                    queryClient.setQueryData(currentQueryKey, (old: any) => updateData(old, variables));
                }
                
            } 

            return { previousData, currentQueryKey };
        },

        onSuccess: async (data, variables, context) => {
            // make Optimistic UI feeling   
            if ( onOptimisticUpdate  && updateData  && context?.currentQueryKey?.length > 0 && data?.data) {
                queryClient.setQueryData(context.currentQueryKey, (oldData: any) => {
                    if (!oldData) return data;
                    
                    const serverTask = data.data as any;
                    const updatedTasks = oldData.data?.map((task: any) =>
                        String(task._id) === String(serverTask?._id)
                            ? { ...task, ...serverTask }
                            : task
                    ) || oldData.data;
                    
                    return {
                        ...oldData,
                        data: updatedTasks,
                    };
                });
            }
           //refresh data with invalidate queries
            if ( !onOptimisticUpdate && configInvalidateQueries) {
                const queries = typeof configInvalidateQueries === 'function'
                    ? configInvalidateQueries(data)
                    : configInvalidateQueries;
                queries.forEach(key => queryClient.invalidateQueries({ queryKey: key }));
            }
            configOnSuccess?.(data, variables, context);
        },

        onError: (error, variables, context) => {
            if (context?.currentQueryKey?.length > 0 && onOptimisticUpdate && context?.previousData) {
                queryClient.setQueryData(context.currentQueryKey, context.previousData);
            }

            const response = error.response?.data as TApiResponse<TErrorData>;
            handleApiError({ response, setError: configSetError, showPopup });
            configOnError?.(error as any, variables, context);
        },

        onSettled: (data, error, variables, context) => {
            // if (context?.currentQueryKey?.length > 0 && !onOptimisticUpdate) {
            //     queryClient.invalidateQueries({ queryKey: context.currentQueryKey });
            // }
            hidePopup("loading");
          
            window.scrollTo({ top: 0, behavior: 'smooth' });
            configOnSettled?.(data, error as any, variables, context);
        },

        ...restConfig,
    });
};