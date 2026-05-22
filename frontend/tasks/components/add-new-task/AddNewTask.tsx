"use client"
import { usePopup } from "@/frontend/shared/context";
import { Modal} from "antd"
import { CloseOutlined } from '@ant-design/icons';
import { Heading, Loading, SmoothBtn } from "@/frontend/shared/components";
import GlobalForm from "@/frontend/shared/components/global-form/GlobalForm";
import { FormField } from "@/frontend/shared/components/global-form/ui/FormField";
import { FormProvider} from "react-hook-form";
import { POPUP } from "@/frontend/shared/constants";
import { useEffect } from "react";
import { useTasksForm } from "../../hooks";



export default function AddNewTask  ()  {
    const {  popupStates, hidePopup  } = usePopup();
    const { methods, handleSubmit, isFetching, isLoading , taskFields } = useTasksForm()
    const { reset, setValue } = methods;
    const addTask =  popupStates?.[POPUP?.TASKS?.ADD] || {}
    const  updateTask =  popupStates?.[POPUP.TASKS.UPDATE] || {}
    const isAddMode = addTask?.open;
    const isUpdateMode = updateTask?.open;
    const openModal = isAddMode || isUpdateMode;
    const modalTitle = isAddMode ? "Create Task" : "Update Task";
    const submitButtonText = isAddMode ? "Create Task" : "Update Task";

    //cancel
    const handleCancel = () => {
        isAddMode ?  hidePopup(POPUP.TASKS.ADD) : hidePopup(POPUP.TASKS.UPDATE)
        reset({}); 
    }
    useEffect(()=>{
        if(addTask?.status > -1){
            setValue("status", {value: addTask?.status})
        }
    },[addTask])
    if(!openModal) return null;
    return(
     <Modal
        title={ 
            <Heading
                title={modalTitle}
                icon={
                    <SmoothBtn 
                        form="searchTeacher"
                        htmlType="button"
                        btnStyle="!bg-none !bg-red-500  !p-1.5  !rounded-full mt-2"
                        children={ <CloseOutlined />}
                        onClick={handleCancel}
                    />
            
                }
            />
        }
        footer={null}
        open={openModal}
        centered
        closeIcon={null}
        width={{
            xs: '90vw',  
            sm: '80vw',  
            md: '80vw',  
            lg: '45vw',  
            xl: '45vw', 
            xxl: '45vw', 
        }}
        
        closable={false}
        styles={{
        container:{
             border: '2px solid var(--borderColor)',
             backgroundColor : ' var(--primaryBackground)',
             height : 'auto',
        },
        body: {
            width: "100%",
          },
        }}

        onCancel={ handleCancel }
    >
       <div>
        {
               isLoading  || isFetching ? 
                    <Loading/> :
                    <FormProvider {...methods}>
                                    <GlobalForm
                                        formLayoutStyle="vertical"
                                        formClassName={`form !relative`}
                                        onSubmit={handleSubmit} 
                                        id={isAddMode ? "add-task": isUpdateMode && "update-task"}
                                        submit = {
                                            {
                                                text: submitButtonText,
                                                class:"w-full mt-5",
                                            }
                                        }
                                    >
                                        <div className="w-full max-h-[60vh] h-auto overflow-y-auto grid grid-cols-1 mt-2 scrollbar">
                                                {
                                                   taskFields.map((field) => (
                                                    <FormField 
                                                        key={field.config.name}
                                                        config={field}
                                                    />
                                                ))}
                                        </div>
                                    </GlobalForm>
                        </FormProvider>
          }
        </div>
     </Modal>
    )
}