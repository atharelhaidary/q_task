"use client"
import { usePagination } from "@/frontend/shared/context/PaginationContext";
import { sortTitle ,sortDate } from "../..";
import { PAGINATION_KEYS } from "@/frontend/shared/constants";
import { memo, useCallback, useEffect, useRef, useState} from "react";
import { Segmented} from "antd";
import { CheckableTagWithTooltip } from "@/frontend/shared/components";


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
    const [ selectedKeys, setSelectedKeys ] = useState([]);
    const {  generateQueryParams, resetQueryParams } = usePagination(PAGINATION_KEYS.TASKS);
    const [ sortTitles , setSortTitles ] = useState(null);
    const [ sortDates, setSortDates ] = useState(null);
    const sholuldReset =  useRef(null)


    //add sort
    const handleOnChange = useCallback((val : string,type : string) => {
        sholuldReset.current = false
        const isNone = val.trim() === ""
        const list = type === "title" ? sortTitle : sortDate;
        const setter = type === "title" ?  setSortTitles : setSortDates
        const typeFilter = type === "title" ? "sortTitle" : 'sortDate'
        //reset sort 
        if(isNone){
            list.forEach((value)=>{
                resetQueryParams(value.key)
            })
            setter(null)
            setSelectedKeys(prev => { 
                const newKeys = prev.filter(select => select.type !== typeFilter)
                return newKeys
            })
            sholuldReset.current = true
            return;
        }
        //set sort
        const selected = list.find(opt => opt.key === val );
        setter(val);
        const index = selectedKeys.findIndex((select)=> select.type === selected.type)
        const newSelect = { parentKey: selected.key, type: selected.type, keyType: 'sort', ...selected.fields }
        if(index > -1){
            selectedKeys[index] = newSelect
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
        if(selectedKeys && selectedKeys?.length > 0 &&!sholuldReset.current ){
            generateQueryParams(selectedKeys)
        }
    },[selectedKeys, sholuldReset])
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

