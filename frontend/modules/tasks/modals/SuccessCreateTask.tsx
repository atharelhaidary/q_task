"use client"
import { Modal} from "antd"
import Image from "next/image"
import successImg from '@/frontend/shared/assets/images/modals/success-img.gif'
import { usePopup } from "@/frontend/shared/context/PopupContext"
import { POPUP } from "@/frontend/shared/constants"
export default function SuccessCreateTask () {
    const {  popupStates, hidePopup } = usePopup();
    const success =  popupStates?.[POPUP.TASKS.SUCCESS] || {}
    const msg = success?.message

    if(!success?.open) return null;
    return(
      <Modal
        title={null}
        footer={null}
        open={success?.open}
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
        onCancel={()=>hidePopup(POPUP.TASKS.SUCCESS)}

>

        <div  className="feedback bg-white px-3 pb-7 rounded-xl gap-4">
            <Image src={successImg} width={200} height={200} alt="success" className="absolute -top-26 rounded-full"/>
            <h3 className="text-[#4F7942]/90 italic mt-25">Success!</h3>
            <p>{msg}</p>
        </div>

</Modal>
    )
}