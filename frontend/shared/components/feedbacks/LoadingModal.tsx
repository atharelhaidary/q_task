"use client"
import { Modal} from "antd"
import { usePopup } from "../../context";
import Loading from "../ui/Loading";
const LoadingModal = () => {
    const {  popupStates } = usePopup();
    if(!popupStates['loading']?.open) return null;
    return(
                            <Modal
                                        title={null}
                                        footer={null}
                                        closable={false}
                                        open={popupStates['loading']?.open}
                                        width="60vw"
                                        styles={{
                                            container:{
                                                    backgroundColor:'transparent',
                                                    position:'relative',
                                                    border: 'none', 
                                                    boxShadow: 'none',         
                                            },
                                            body: {
                                                height: '75vh',
                                                border: 'none',
                                            },
                                            title:{
                                                color: 'var(--primary)',
                                                textAlign: 'center',
                                                fontSize:'24px'
                                            },
                                            wrapper: {
                                                border: 'none',
                                              },
                                        }}

                            >

                                <Loading/>
                            </Modal>
                        )
}
export default LoadingModal;