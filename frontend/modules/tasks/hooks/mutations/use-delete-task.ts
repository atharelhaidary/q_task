import { usePopup } from "@/frontend/shared/context/PopupContext";
import { useApiMutaion } from "@/frontend/shared/hooks/useApiMutation";
import { TApiResponse } from "@/shared/types";
import {  tasksServices } from "../../services/tasks.services";
import { POPUP, QUERY_KEYS } from "@/frontend/shared/constants";
export const useDeleteTask= () => {
    const {  showPopup, hidePopup } = usePopup();
    return useApiMutaion<TApiResponse,any>({
            func :async (data : FormData ): Promise<TApiResponse> => {
                return await tasksServices.deleteServices(data)
            },
            config:{
                onSuccess : (data) => {
                    const { success, message} = data || {}
                    hidePopup(POPUP.TASKS.DELETE)
                    if(success){
                        showPopup(POPUP.TASKS.SUCCESS,{data:{ message}})
                    }
                },
                invalidateQueries: (data) => {
                    const queries = [[QUERY_KEYS.TASKS],];
                    return queries;
                }
            }
          })
}
