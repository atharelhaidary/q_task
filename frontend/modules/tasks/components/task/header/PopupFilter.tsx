"use client"
import {  statusFilter } from "../..";
import { memo} from "react";
import { Segmented } from "antd";
import { CheckableTagWithTooltip } from "@/frontend/shared/components";
import { usePopupFilter } from "../../../hooks";


const segmentedStatusFilterOptions =  statusFilter.map((option,) => ({
        key : option.key ,
        label: option.label,
        value : option.value,
        type  : option.type,
        className :  option.value.trim() === "" && "reset-filter"
}));

const PopupFilter = memo(({item}:{item : Record<string,any>})=> {
    const {  statusFilterSeg, selectedKeys, setSelectedKeys, handleOnChange }= usePopupFilter();
    return(
    <div className={`flex-col-container gap-3    ${item?.type === "add" && "hidden"}`}>
                <CheckableTagWithTooltip selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys}  type="filter"/>
                <div>
                    <h4>Priority</h4>
                    <Segmented
                        options={segmentedStatusFilterOptions}
                        value={statusFilterSeg}
                        onChange = {(val)=>handleOnChange(val,'status')}
                    />
                </div>
    </div>

    )
})
export default PopupFilter;

