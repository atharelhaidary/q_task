"use client"
import { Modal} from "antd"
import Image from "next/image"
import errorImg from '../../assets/images/modals/errror-img.gif'
import { usePopup } from "../../context"
import SmoothBtn from "../ui/SmoothBtn"
const ErrorModal = () => {
    const {  popupStates, hidePopup  } = usePopup();
    const handleCancel = () => {
        hidePopup('error')
    }
    if(!popupStates['error']?.open) return null;
    return(
     <Modal
        title={null}
        footer={null}
        open={popupStates['error']?.open}
        centered
        closeIcon={
            <div className="bg-error p-2 rounded-full hover:bg-gradient-reset">
                {/* <IoMdClose size={20}/> */}
                x
            </div>
        }
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
        },
        body: {
            width:"100%",
            height: 'auto',
        },
        }}

        onCancel={ handleCancel }
>
        <div className="feedback bg-white px-4 pb-7 rounded-xl gap-4 ">
            
            <Image src={errorImg.src} width={200} height={200} alt="errorImg" className="absolute -top-26 rounded-full"/>
            <h3 className="!text-red-500 italic mt-25">Error!!</h3>
            <p className="max-h-[30vh] h-auto overflow-y-auto  scrollbar">{popupStates['error']?.message}</p>
            <div className=" flex gap-10">
                 <SmoothBtn
                        htmlType="button"
                        title="try again"
                        btnStyle="!px-15"
                        onClick={handleCancel}
                        form={""}               
                 />
            </div>
        </div>

     </Modal>
    )
}
export default ErrorModal;