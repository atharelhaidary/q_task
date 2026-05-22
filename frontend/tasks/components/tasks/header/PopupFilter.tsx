"use client"
import { usePagination } from "@/frontend/shared/context/PaginationContext";
import {  statusFilter } from "../..";
import { PAGINATION_KEYS } from "@/frontend/shared/constants";
import { memo, useCallback, useEffect, useRef, useState} from "react";
import { Segmented } from "antd";
import { CheckableTagWithTooltip } from "@/frontend/shared/components";



const segmentedStatusFilterOptions =  statusFilter.map((option,) => ({
        key : option.key ,
        label: option.label,
        value : option.value,
        type  : option.type,
        className :  option.value.trim() === "" && "reset-filter"
}));
const PopupFilter = memo(({item}:{item : Record<string,any>})=> {
    const [ selectedKeys, setSelectedKeys ] = useState([]);
    const {  generateQueryParams, resetQueryParams } = usePagination(PAGINATION_KEYS.TASKS);
    const [ statusFilterSeg , setStatusFilterSeg ] = useState(null);
    const sholuldReset =  useRef(null)


    //add sort
    const handleOnChange = useCallback((val : string,type : string) => {
        sholuldReset.current = false
        const isNone =  val.trim() === ""
        const list = type === "status" && statusFilter;
        const setter = type === "status" &&  setStatusFilterSeg
        //reset sort 
        if(isNone){
            list.forEach((value)=>{
                resetQueryParams(value.key)
            })
            setter(null)
            setSelectedKeys(prev => { 
                const newKeys = prev.filter(select => select.type !== type)
                return newKeys
            })
            sholuldReset.current = true
            return;
        }
        //set sort
        const selected = list.find(opt => opt.key === val );
        setter(val);
        const index = selectedKeys.findIndex((select)=> select.type === selected.type)
        const newSelect = { parentKey: selected.key, type: selected.type, keyType: 'filter', ...selected.fields }
        if(index > -1){
            setSelectedKeys(prev => { 
                const newArray = [...prev];
                newArray[index] = newSelect;
                return newArray;
            })
            return;
        }
        setSelectedKeys([...selectedKeys,newSelect])
    },[selectedKeys])

    useEffect(()=>{
        if(selectedKeys && selectedKeys?.length > 0 && !sholuldReset.current){
            generateQueryParams(selectedKeys)
        }
    },[selectedKeys, sholuldReset,])
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

