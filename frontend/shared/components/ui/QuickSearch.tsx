"use client"
import GlobalForm from "../global-form/GlobalForm";
import { FormField } from "../global-form/ui/FormField";
import { FormProvider, useForm} from "react-hook-form";
import { usePagination } from "../../context/PaginationContext";
import { useDebounce } from "../../hooks";
import { memo, useCallback, useEffect} from "react";
import { SEARCH_INPUT } from "../../config/search-input.config";
type QuickSearchProps = {
    onSearch?: (data: any) => void;
    id: string;
  };
  
const QuickSearch = memo(({onSearch,id}:QuickSearchProps)=> {
    const methods = useForm();
    const { watch } = methods
    const searchInput  = watch("search")
    const {  generateQueryParams, resetQueryParams } = usePagination(id);
    const debouncedSearch = useDebounce(searchInput, 500);
    
    
    const handleSearch = useCallback((searchTerm: string) => {
        if (searchTerm) {
            generateQueryParams([{ parentKey :'search' ,key : 'search', value : searchTerm }]);
        } else {
            resetQueryParams("search");
        }
    }, [debouncedSearch]); 
    
    useEffect(() => {
        handleSearch(debouncedSearch);
    }, [debouncedSearch]);

    const fields = Object?.values(SEARCH_INPUT)
    return(
        <FormProvider {...methods}>
                <GlobalForm
                    formLayoutStyle="inline"
                    formClassName="w-full md:w-100" 
                    id={id}
                    hasBtn={false}
                >
                      {  fields.map((field) => (
                                <FormField 
                                    key={field.config.name}
                                    config={field}
                                />
                      ))} 
                    </GlobalForm>
        </FormProvider>
    )
})
export default QuickSearch