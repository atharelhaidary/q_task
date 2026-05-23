"use client"
import { FieldValues, useForm } from "react-hook-form"
import { usePopup } from "@/frontend/shared/context"
import { generateFormData } from "@/frontend/shared/lib"
import { useCallback, useEffect, useMemo}  from "react"
import { POPUP } from "@/frontend/shared/constants"
import { useCreateTask, useGetTasks, useUpdateTask } from "."
import { TASK_INPUTS } from "../config"

const TASK_FIELDS = Object.values(TASK_INPUTS);

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
    const {  popupStates , hidePopup } = usePopup();
    const popupAdd = useMemo(() => popupStates?.[POPUP.TASKS.ADD] || {}, [popupStates?.[POPUP.TASKS.ADD]])
    const popupUpdate = useMemo(() => popupStates?.[POPUP.TASKS.UPDATE] || {}, [popupStates?.[POPUP.TASKS.UPDATE]])
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
    }, [isAddMode, isUpdateMode, createTask, updateTask]);
    // get specific teacher
    const { data, isLoading  , isFetching } =  useGetTasks({
        data :{_id: updateId},
        enabled : !!isUpdateMode
    })
    const tasksData = useMemo(()=>{
       return data?.data[0]
    },[data?.data])

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

     

      const handleCancel = useCallback(() => {
        const popupKey = isAddMode ? POPUP.TASKS.ADD : POPUP.TASKS.UPDATE;
        hidePopup(popupKey);
        reset({});
    }, [isAddMode, hidePopup, reset]);


    return useMemo(() => ({
        popupAdd,
        popupUpdate,
        methods,
        handleSubmit,
        isLoading,
        isFetching,
        taskFields: TASK_FIELDS,
        handleCancel,
    }), [popupAdd, popupUpdate, methods, handleSubmit, isLoading, isFetching, handleCancel]);
}