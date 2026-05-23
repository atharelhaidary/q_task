"use client"
import { sortTitle ,sortDate } from "../..";
import { memo} from "react";
import { Segmented} from "antd";
import { CheckableTagWithTooltip } from "@/frontend/shared/components";
import { usePopupSort } from "../../../hooks";


const segmentedTitleOptions = sortTitle?.map((option,)  => ({
        key : option.key ,
        label: option.label,
        value : option.value,
        type  : option.type,
        className : option.value.trim() === "" && "reset-filter"
}));

const segmentedDateOptions =  sortDate.map((option,) => ({
        key : option.key ,
        label: option.label,
        value : option.value,
        type  : option.type,
        className : option.value.trim() === "" && "reset-filter"
}));
const PopupSort = memo(({item}:{item : Record<string,any>})=> {
    const { sortTitles, sortDates, selectedKeys, setSelectedKeys, handleOnChange } = usePopupSort()
    return(
    <div className={`flex-col-container gap-3    ${item?.type === "add" && "hidden"}`}>
                <CheckableTagWithTooltip selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} type="sort"/>
                <div>
                    <h4>Title</h4>
                    <Segmented
                        options={segmentedTitleOptions}
                        value={sortTitles}
                        onChange = {(val)=>handleOnChange(val,'title')}
                    />
                </div>
                
                <div>
                    <h4>Date</h4>
                    <Segmented
                        options={segmentedDateOptions}
                        value={sortDates}
                        onChange = {(val)=>handleOnChange(val,'date')}
                    />
                </div>
    </div>

    )
})
export default PopupSort;

