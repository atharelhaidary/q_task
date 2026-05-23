import { usePopup } from "@/frontend/shared/context/PopupContext";
import { FieldValues, UseFormSetError } from "react-hook-form";
import { useApiMutaion } from "@/frontend/shared/hooks/useApiMutation";
import { ITask, TApiResponse} from "@/shared/types";
import {  tasksServices} from "../../services/tasks.services";
import { POPUP, QUERY_KEYS } from "@/frontend/shared/constants";
type TuseUpdateTaskProps = {
    setError?: UseFormSetError<FieldValues>;
    params? : Record<string,any>
}

export const useUpdateTask = ({setError, params}: TuseUpdateTaskProps = {}) => {
    const {  showPopup, hidePopup } = usePopup();
    return useApiMutaion<TApiResponse<ITask>,any>({
            func :async (data :FormData): Promise<TApiResponse<ITask>> => {
                return await tasksServices.updateServices(data)
            },
            config:{
                setError,
                queryKey: () => [QUERY_KEYS.TASKS, params],
                onOptimisticUpdate: setError ? false : true,
                onSuccess : (data) => {
                    const { message,success } = data || {}
                    hidePopup(POPUP.TASKS.UPDATE)
                    if(success && setError ){
                        showPopup(POPUP.TASKS.SUCCESS,{data:{ message}})
                    }
                },
                updateData: (oldData: any, variables: FormData) => {
                    if (!oldData?.data) return oldData;
                    
                    const taskId = variables.get('_id');
                    const newStatus = variables.get('status');
                    
                    return {
                        ...oldData,
                        data: oldData.data.map((task: any) =>
                            String(task._id) === String(taskId)
                                ? { ...task, status: parseInt(newStatus as string) }
                                : task
                        )
                    };
                },
                invalidateQueries: (data) => {
                        const queries = [[QUERY_KEYS.TASKS]];
                        return queries;
                }
            }
          })
}
