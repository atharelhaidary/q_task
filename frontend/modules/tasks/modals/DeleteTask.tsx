"use client"
import { Modal} from "antd"
import Image from "next/image"
import delImg from '@/frontend/shared/assets/images/modals/delete-image.gif'
import SmoothBtn from "@/frontend/shared/components/ui/SmoothBtn"
import { usePopup } from "@/frontend/shared/context/PopupContext"
import { generateFormData } from "@/frontend/shared/lib"
import { POPUP } from "@/frontend/shared/constants"
import { useDeleteTask } from "../hooks"
export default function DeleteTask () {
    const {  popupStates, hidePopup, showPopup } = usePopup();
    const { mutate : deleteTask } = useDeleteTask();
    const openModal = popupStates?.[POPUP.TASKS.DELETE] || {}
    const { open , ids } = openModal

     //handle Delete
     const handleDelete = () => {
        showPopup("loading")
        const formData = new FormData();
        const formDataResult = generateFormData(formData,{ids})
        deleteTask(formDataResult)
    }
    //handle cancel
    const handleCancel = () => {
        hidePopup(POPUP.TASKS.DELETE)
    }
    if(!openModal) return null;
    return(
      <Modal
        title={null}
        footer={null}
        open={open}
        centered
        width={{
            xs: '90vw',  
            sm: '80vw',  
            md: '80vw',  
            lg: '60vw',  
            xl: '50vw',  
            xxl: '40vw'  
        }}
        closable={false}
        styles={{
        container:{
            height:'auto',
            position: 'relative',
            padding:0
                
        },
        body: {
            width:"100%",
            height: 'auto',
        },
        title:{
            color: 'var(--primary)',
            textAlign: 'center',
            fontSize:'24px'
        },
        }}
        onCancel={handleCancel}

>

        <div  className="feedback bg-white px-3 pb-7 rounded-xl gap-4">
            <Image src={delImg} width={200} height={200} alt="deleteImg" className="absolute -top-26 rounded-full"/>
            <h3 className="text-redColor mt-25">Are you sure ?</h3>
            <p >This action will delete all your information<br/>You won't be able to revert this!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 ">
                {
                    [
                        {title:"yes,delete it",btnStyle:"!bg-redColor !text-white", onClick : handleDelete, id:1},
                        {title:"cancel",btnStyle:"!border-redColor  !border-[2px] !text-redColor", onClick : handleCancel,id:2},
                    ].map((btn,)=>(
                            <SmoothBtn 
                                key={btn.id}
                                type={btn.id == 2 ? "text" :"primary"}
                                htmlType="button"
                                title={btn.title}
                                btnStyle={`!bg-none  !px-12 !py-1 ${btn.btnStyle} !h-full`}
                                hoverColor="!bg-none"
                                onClick={ btn.onClick }
                            />
                    ))
                }
            </div>
        </div>

</Modal>
    )
}


