import { PAGINATION_KEYS } from "@/frontend/shared/constants";
import { usePagination } from "@/frontend/shared/context/PaginationContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { statusFilter } from "../config";

export const usePopupFilter = () =>{
    const [selectedKeys, setSelectedKeys] = useState([]);
    const { generateQueryParams, resetQueryParams } = usePagination(PAGINATION_KEYS.TASKS);
    const [ statusFilterSeg , setStatusFilterSeg ] = useState(null);
    const shouldGenerateRef = useRef(false); 

    const handleOnChange = useCallback((val: string, type: string) => {
        const isNone = val.trim() === "";
        const list = type === "status" && statusFilter;
        const setter = type === "status" &&  setStatusFilterSeg

        if(isNone){
            list.forEach((value)=>{
                resetQueryParams(value.key)
            })
            setter(null)
            setSelectedKeys(prev => { 
                const newKeys = prev.filter(select => select.type !== type)
                return newKeys
            })
            shouldGenerateRef.current = true
            return;
        }


        const selected = list.find(opt => opt.key === val);
        setter(val);

        const newSelect = {
            parentKey: selected.key,
            type: selected.type,
            keyType: 'filter',
            ...selected.fields
        };

        shouldGenerateRef.current = true; 
        setSelectedKeys(prev => {
            const index = prev.findIndex(s => s.type === selected.type);
            return index > -1
                ? prev.map((s, i) => i === index ? newSelect : s)
                : [...prev, newSelect];
        });

    }, [resetQueryParams]);

    useEffect(() => {
        if (selectedKeys?.length > 0 && shouldGenerateRef.current) {
            generateQueryParams(selectedKeys);
        }
    }, [selectedKeys, generateQueryParams]);

    return { statusFilterSeg, selectedKeys, setSelectedKeys, handleOnChange };
}