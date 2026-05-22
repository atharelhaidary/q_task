import { Key} from "react"
import { usePopup } from "../context";

type TProps = {
    id: string;
    selectedRowKeys : Key[];
    popupName : string;
    data : Record<string,any>;
    allowMultiple: boolean; 
    actionType: 'edit' | 'delete';
}


export const useTableAction = () => {
    const { showPopup } = usePopup()
    const handleTableAction = ({id,selectedRowKeys,popupName,actionType,allowMultiple, data}:TProps) =>{
        if (selectedRowKeys?.length === 0) {
            showPopup("error", {
                data: { message: 'Please select a row first' }
            })
            return
        }
        
        if (!allowMultiple && selectedRowKeys?.length > 1) {
            showPopup("error", {
                data: { message: 'Please select only one row to edit' }
            })
            return
        }
        
        if ( id !== selectedRowKeys?.[0] && selectedRowKeys?.length === 1) {
            showPopup("error", {
                data: { message: `You must ${actionType} the selected row`}
            })
            return
        }
        showPopup(popupName, { data: { ...data } })
    }

    return {
        handleTableAction
    }
}