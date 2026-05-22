"use client"
import { FieldValues, useForm } from "react-hook-form"
import { usePopup } from "@/frontend/shared/context"
import { generateFormData } from "@/frontend/shared/lib"
import { useCallback, useEffect, useMemo}  from "react"
import { POPUP } from "@/frontend/shared/constants"
import { useCreateTask, useGetTasks, useUpdateTask } from "."
import { TASK_INPUTS } from "../config"

export const useTasksForm = ()  => {
    const methods = useForm({
        defaultValues: ({
            title: null,
            desc: null,
            status: null,
            priority: null,
        }),
    });
    const {  reset, setError } = methods
    const { mutate : createTask } = useCreateTask({setError})
    const { mutate : updateTask } = useUpdateTask({setError})
    const {  popupStates  } = usePopup();
    const popupAdd = popupStates?.[POPUP.TASKS.ADD] || {}
    const popupUpdate = popupStates?.[POPUP.TASKS.UPDATE] || {}
    const isAddMode = popupAdd?.open 
    const isUpdateMode = popupUpdate?.open
    const updateId = popupUpdate?.id
    //submit function
    const handleSubmit = useCallback((data: FieldValues) => {
        const formData = new FormData();
        const apiFormData = {
            ...data,
            priority : data?.priority?.value,
            status :  data?.status?.value,
        }
        const newApiFormData = generateFormData(formData, apiFormData);
        if (isAddMode) {
            createTask(newApiFormData);
        } else if (isUpdateMode) {
            updateTask(newApiFormData);
        }
    }, [isAddMode, isUpdateMode,]);
    // get specific teacher
    const { data, isLoading  , isFetching } =  useGetTasks({
        data :{_id: updateId},
        enabled : !!isUpdateMode
    })
    const tasksData = useMemo(()=>{
       return data?.data[0]
    },[data?.data])
    ;

    // assign teachet data to form inputs
    useEffect(() => {
        if (tasksData && isUpdateMode) {
         const {priority, status, tags } = tasksData || {}
          reset({
            ...tasksData,
            priority : { value : priority},
            status :   { value : status},
            ...(tasksData?.tags && {tags : tags.join(",") || tags.join(" ")} ) 
           })
        }
      }, [ tasksData,isUpdateMode, reset]);

      const taskFields = Object?.values(TASK_INPUTS)


    return {
        methods,
        handleSubmit,
        isLoading,
        isFetching,

        taskFields
    }
}