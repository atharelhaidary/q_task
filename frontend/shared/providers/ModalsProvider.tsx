"use client"
import { AddNewTaks, DeleteClass, SuccessCreateTask } from "@/frontend/tasks/components";
import { usePopup } from "../context";

const ModalsProvider = () => {
    const {  popupStates  } = usePopup();
    const taskModal = popupStates['addTask']?.open || popupStates['updateTask']?.open
    const deleteTask = popupStates['deleteTask']?.open 
    const successTask =  popupStates['successTask']?.open 




    return (
        
            <>
             { taskModal && <AddNewTaks/> }
             { deleteTask && <DeleteClass/> }
             { successTask && <SuccessCreateTask /> }
            </>
    )
}
export default ModalsProvider;