"use client"
import { usePathname} from "next/navigation";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { FieldValues } from "react-hook-form";

const NOT_ALLOWED_ROUTES = [
    "/"
]

type TPaginationKey = {
    page?: number;
    limit?: number;
    queryParams?: string;
    resetKeys ? : {
        key : string,
        values : string,
        keyType : string,
        type : string
    }[] ,
};
type TPaginationContext = {
    generateQueryParams : (data : FieldValues,key?: string) => void;
    resetQueryParams : (filterKeys: string | string [] , key?: string ) => void;
    paginationKey : TPaginationKey;
    setPagination:(updates: TPaginationKey, key?: string) => void;
    isInfiniteScroll : boolean;
}

const PaginationContext = createContext<TPaginationContext | null>(null);

const DEFAULT_PAGE  = 1;
const DEFAULT_LIMIT = 6;

export const PaginationProvider = ({children}:{children:React.ReactNode}) => {
  
    const [ paginationKey, setPaginationKey ] = useState<Record<string,TPaginationKey>>({});
    const pathname = usePathname();
    const isInfiniteScroll = NOT_ALLOWED_ROUTES.some((route)=> route.trim() === pathname.trim())
   //add filters
    const generateQueryParams = useCallback(( data: Record<string,any>,  key : string) => {
            setPaginationKey((prev: Record<string, TPaginationKey>) => {
                    const existingState = prev?.[key];
                    const { page : pginationPage,  limit: paginationLimit, queryParams, resetKeys } = existingState || {}
                    const currentPage = pginationPage ?? DEFAULT_PAGE ;
                    const currentLimit = paginationLimit ?? DEFAULT_LIMIT;
                    const currentQueryParams = queryParams ?? (isInfiniteScroll ? "" : `page=${currentPage}&limit=${currentLimit}`);
                    const params = new URLSearchParams(currentQueryParams);
                    const newResetKeys = Array.isArray(resetKeys) && resetKeys?.length > 0 ? [...resetKeys] : []
                    if(data){
                        Object.values(data).forEach((values,index) => {
                            const { key , value, parentKey, keyType, type } = values || {}
                            if(typeof value === "object") {
                                    Object.entries(value).forEach(([valKey, v]) => {
                                        params.set(`${key}[${index}][${valKey}]`, String(v));
                                        newResetKeys[newResetKeys.length] = {
                                            key: parentKey,
                                            values: `${key}[${index}][${valKey}]`,
                                            ...(keyType && {keyType}),
                                            ...(type && {type})
                                        }
                                    });
                                    return;
                            }
                            if (value !== undefined && value !== null && String(value).trim() !== '') {
                                        params.set(key, String(value).trim());
                                        newResetKeys[newResetKeys.length] = {
                                            key : parentKey,
                                            values: key,
                                            ...(keyType && {keyType}),
                                            ...(type && {type})
                                        }
                                    return;
                            } 
                            else {
                                params.delete(key);
                            }
                        });
                    }
       
                    const newState = {
                         ...prev,
                         [key]: { 
                         ...prev?.[key],
                         queryParams : params.toString(),
                         page : isInfiniteScroll ? 1 : currentPage , 
                         ...(!isInfiniteScroll && {  limit: currentLimit}),
                         resetKeys : [...new Map(newResetKeys.map(item => [item.values, item])).values()]
                        }
                    };
                    
                    return newState;
            });
            
    }, [isInfiniteScroll]);
    // reset filters 
    const resetQueryParams = useCallback((filterKeys: string | string[], key: string,) => {
        setPaginationKey((prev: Record<string, TPaginationKey>) => {
            const existingState = prev?.[key];
            const { page : pginationPage,  limit: paginationLimit, queryParams, resetKeys } = existingState || {}
            const currentPage = pginationPage ?? DEFAULT_PAGE;
            const currentLimit = paginationLimit?? DEFAULT_LIMIT;
            const currentQueryParams = queryParams ?? (isInfiniteScroll  ?  "" :`page=${currentPage}&limit=${currentLimit}`)

            const params = new URLSearchParams(currentQueryParams);
            const newResetKeys = Array.isArray(resetKeys)  && resetKeys?.length > 0 ?  resetKeys?.filter((keys) => {
                if (keys?.key === filterKeys) {
                    params.delete(keys?.values);
                    return false; 
                }
                return true; 
            }) : [];
            const newState = {
                ...prev,
                [key]: { 
                    page : !isInfiniteScroll ? currentPage : 1,
                    ...(!isInfiniteScroll && {  limit: currentLimit}),
                    queryParams : params.toString(),
                    resetKeys: newResetKeys
                }
            } ;
        
            
            return newState;
       });
    }, [isInfiniteScroll]); 
     //set page or set limit
     const setPagination = useCallback((updates: TPaginationKey, key: string) => {
        setPaginationKey((prev: Record<string, TPaginationKey>) => {
            const currentState = prev?.[key];
            const { page : pginationPage,  limit: paginationLimit , queryParams } = currentState || {}
            const newPage =   updates.page ??  pginationPage ?? DEFAULT_PAGE;
            const newLimit = updates.limit ??  paginationLimit ?? DEFAULT_LIMIT;
            const params = new URLSearchParams(queryParams);
            if(!isInfiniteScroll){
                params.set("page", String(newPage))
                params.set("limit", String(newLimit))
            }
            const newState = {
                ...prev,
                [key]: {
                   ... currentState,
                   page : isInfiniteScroll ? 1 : newPage , 
                    ...(!isInfiniteScroll && {  limit: newLimit}),
                    queryParams: params.toString(),
                }
            };
            return newState;
        });
    }, [isInfiniteScroll]);

    const contextValue = useMemo(() => ({
        paginationKey,
        generateQueryParams,
        resetQueryParams,
        setPagination,
        isInfiniteScroll,
    }), [setPagination, generateQueryParams, resetQueryParams,paginationKey, isInfiniteScroll]);
    return(
        <PaginationContext.Provider value={contextValue} key={pathname}>
            {children}
        </PaginationContext.Provider>
    )
}





export const usePagination = (key?: string) => {
    const context = useContext(PaginationContext);
    const finalKey = key || "nokey";
    const isInfiniteScroll = context.isInfiniteScroll

    const { generateQueryParams, resetQueryParams, setPagination } = context;

    const handleGenerateQueryParams = useCallback((data: FieldValues) => {
        generateQueryParams(data, finalKey);
    }, [generateQueryParams, finalKey]); 

    const handleResetQueryParams = useCallback((filterKeys: string | string[]) => {
        resetQueryParams(filterKeys, finalKey);
    }, [resetQueryParams, finalKey]);

    const handleSetPagination = useCallback((updates: TPaginationKey) => {
        setPagination(updates, finalKey);
    }, [setPagination, finalKey]); 
    
    const paginationKeyValue = useMemo(() => {
        return context.paginationKey?.[finalKey] || {
                            ...(isInfiniteScroll ? { page: 1} : { page: 1, limit: 6}),
                            queryParams: isInfiniteScroll ? "" : "page=1&limit=6"
                }
    }, [context.paginationKey?.[finalKey], isInfiniteScroll]);
    
    return {
        ...context,
        paginationKey: paginationKeyValue,
        generateQueryParams: handleGenerateQueryParams,
        resetQueryParams: handleResetQueryParams,
        setPagination: handleSetPagination,
    };
};



