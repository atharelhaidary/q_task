import {  Select } from "antd";
import { mergeClasses } from "../../../lib/utils/merge-classes";
import { TInputs } from "../../../types/form-field.types";
import { useFormContext } from "react-hook-form";
const SelectBox  =  ({control,field,status}:TInputs) => {
    const { clearErrors } = useFormContext()
    const { name, placeholder, input , loadMore, hasNextPage} = field.config || {}
    const { loading, options, multiple, class :classInput, disabled } = input || {}
    
    return(
        <Select 
                {...control}
                labelInValue
                loading={loading}
                id={name}
                placeholder={placeholder} 
                options={options}
                disabled={disabled}  
                mode={multiple ? "multiple" : undefined}
                value={multiple ? control.value || [] : control.value || undefined}
                onChange={(val) => {
                    control.onChange(val)
                    clearErrors(field.config.name)
                }}
                className={mergeClasses(
                    "custom-input",
                    status.error && "!border-b-red-500 !border-1 ",
                    classInput
                )}
                allowClear
                virtual={true}  
                listHeight={100} 
                getPopupContainer={(trigger) => trigger.parentNode}  
                onPopupScroll={(e) => {
                    const target = e.target as HTMLDivElement;
                    if (target.scrollTop + target.clientHeight === target.scrollHeight && hasNextPage) {
                        loadMore();
                    }
                }}
        />
    )
}
export default SelectBox;