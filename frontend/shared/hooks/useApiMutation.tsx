
import { UseMutationOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues, UseFormSetError } from "react-hook-form";
import { AxiosError } from "axios";
import { usePopup } from "../context/PopupContext";
import { TApiResponse, TInvalidateQueries } from "@/shared/types";
import { handleApiError } from "../lib";
import { useCallback } from "react";

export type ApiAxiosError<T = unknown> = AxiosError<TApiResponse<T>>;
type TMutationContext = { previousData: unknown; currentQueryKey: any[] }

export type TConfig<TResponse = unknown, TRequest = unknown> = {
    invalidateQueries?: TInvalidateQueries<TResponse>;
    setError?: UseFormSetError<FieldValues>;
    queryKey?: any[] | (() => any[]);
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
        ...restConfig
    } = config || {};

    const getCurrentQueryKey = useCallback(() => {
        if (typeof config?.queryKey === 'function') return config.queryKey();
        return config?.queryKey || [];
    }, [config?.queryKey]);

    return useMutation<TResponse, ApiAxiosError<TErrorData>, TRequest, TMutationContext>({
        mutationFn: func,

        onMutate: async (variables): Promise<TMutationContext> => {
            const currentQueryKey = getCurrentQueryKey();
            let previousData = undefined;

            if (currentQueryKey.length > 0 && onOptimisticUpdate) {
                await queryClient.cancelQueries({ queryKey: currentQueryKey });
                previousData = queryClient.getQueryData(currentQueryKey);
                if (updateData) {
                    queryClient.setQueryData(currentQueryKey, (old: any) => updateData(old, variables));
                }
            } 

            return { previousData, currentQueryKey };
        },

        onSuccess: (data, variables, context) => {
            // ✅ في حالة optimistic update، منعملش invalidate خالص
            if (!onOptimisticUpdate && configInvalidateQueries) {
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
            if (context?.currentQueryKey?.length > 0 && onOptimisticUpdate) {
                queryClient.invalidateQueries({ queryKey: context.currentQueryKey });
            }
            hidePopup("loading");
          
            window.scrollTo({ top: 0, behavior: 'smooth' });
            configOnSettled?.(data, error as any, variables, context);
        },

        ...restConfig,
    });
};