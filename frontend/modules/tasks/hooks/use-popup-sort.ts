import { PAGINATION_KEYS } from "@/frontend/shared/constants";
import { usePagination } from "@/frontend/shared/context/PaginationContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { sortTitle, sortDate } from "../config";


export const usePopupSort = () => {
    const [selectedKeys, setSelectedKeys] = useState([]);
    const { generateQueryParams, resetQueryParams } = usePagination(PAGINATION_KEYS.TASKS);
    const [sortTitles, setSortTitles] = useState(null);
    const [sortDates, setSortDates] = useState(null);
    const shouldGenerateRef = useRef(false); 

    const handleOnChange = useCallback((val: string, type: string) => {
        const isNone = val.trim() === "";
        const list = type === "title" ? sortTitle : sortDate;
        const setter = type === "title" ? setSortTitles : setSortDates;
        const typeFilter = type === "title" ? "sortTitle" : "sortDate";

        if (isNone) {
            list.forEach((value) => resetQueryParams(value.key));
            setter(null);
            shouldGenerateRef.current = false; 
            setSelectedKeys(prev => prev.filter(s => s.type !== typeFilter));
            return;
        }

        const selected = list.find(opt => opt.key === val);
        setter(val);

        const newSelect = {
            parentKey: selected.key,
            type: selected.type,
            keyType: 'sort',
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

    return { sortTitles, sortDates, selectedKeys, setSelectedKeys, handleOnChange };
};