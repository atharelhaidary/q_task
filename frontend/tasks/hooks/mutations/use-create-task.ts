import { usePopup } from "@/frontend/shared/context/PopupContext";
import { FieldValues, UseFormSetError } from "react-hook-form";
import { useApiMutaion } from "@/frontend/shared/hooks/useApiMutation";
import { ITask, TApiResponse } from "@/shared/types";
import { tasksServices } from "../../services/tasks.services";
import { POPUP, QUERY_KEYS } from "@/frontend/shared/constants";
type TuseCreateTaskProps = {
    setError: UseFormSetError<FieldValues>;
}
export const useCreateTask = ({setError}: TuseCreateTaskProps) => {
    const {  showPopup, hidePopup } = usePopup();
    return useApiMutaion<TApiResponse<ITask>,any>({
            func :async (data :FormData): Promise<TApiResponse<ITask>> => {
                return await tasksServices.createServices(data)
            },
            config:{
                setError,
                onSuccess : (data) => {
                    const { success, message } = data || {}
                    hidePopup(POPUP.TASKS.ADD)
                    if(success){
                        showPopup(POPUP.TASKS.SUCCESS,{data:{message}})
                    }
                },
                invalidateQueries: (data) => {
                    const queries = [[QUERY_KEYS.TASKS]];
                    return queries;
                }
            }
          })
}
