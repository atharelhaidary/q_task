"use client"
import { Modal} from "antd"
import { CloseOutlined } from '@ant-design/icons';
import { Heading, Loading, SmoothBtn } from "@/frontend/shared/components";
import GlobalForm from "@/frontend/shared/components/global-form/GlobalForm";
import { FormField } from "@/frontend/shared/components/global-form/ui/FormField";
import { FormProvider} from "react-hook-form";
import { useEffect } from "react";
import { useTasksForm } from "../../hooks";



export default function AddNewTask  ()  {
    const { popupAdd, popupUpdate, methods, handleSubmit, isFetching, isLoading , taskFields, handleCancel } = useTasksForm()
    const {  setValue } = methods;
    const openModal = popupAdd?.open || popupUpdate?.open;
    const modalTitle = popupAdd?.open ? "Create Task" : "Update Task";
    const submitButtonText = popupAdd?.open ? "Create Task" : "Update Task";

    useEffect(()=>{
        if(popupAdd?.status > -1){
            setValue("status", {value: popupAdd?.status})
        }
    },[popupAdd?.status, setValue])
    return(
     <Modal
        title={ 
            <Heading
                title={modalTitle}
                icon={
                    <SmoothBtn 
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
                                        id={ popupAdd?.open ? "add-task":  "update-task"}
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