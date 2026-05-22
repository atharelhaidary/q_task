import { useApiQuery} from "@/frontend/shared/hooks";
import { ITask, TApiResponse} from "@/shared/types";
import { usePagination } from "@/frontend/shared/context/PaginationContext";
import {  tasksServices} from "../../services/tasks.services";
import { PAGINATION_KEYS, QUERY_KEYS } from "@/frontend/shared/constants";
import { useMemo} from "react";
type TProps = {
   enabled?:  boolean
   data ?: Record<string,any>
   key ? : string;
}
export const useGetTasks =  ({enabled = true, data, key}: TProps ={}) => {
    const finalKey = key ? `${key}_${PAGINATION_KEYS.TASKS}` :  PAGINATION_KEYS.TASKS
    const { paginationKey  } = usePagination(finalKey);
    const { queryParams } =  paginationKey|| {}; 
    const stableData = useMemo(() => data, [JSON.stringify(data)]); 

    
    const finalParams = useMemo(() => {
        const params = new URLSearchParams(queryParams)
        if(data?.pagination === false || data?._id){
            params.delete("page") 
            params.delete("limit")
        }
        const paramsObject = Object.fromEntries(params);
        return data ? { ...data, ...paramsObject } : paramsObject;
    }, [stableData,queryParams]);
    
    
    return useApiQuery<TApiResponse<ITask[]>, any>({
        keys:[QUERY_KEYS.TASKS,finalParams] ,
        func: () => tasksServices.getAll(finalParams), 
        enabled: enabled && Object.keys(finalParams).length > 0 ,
    });
}



