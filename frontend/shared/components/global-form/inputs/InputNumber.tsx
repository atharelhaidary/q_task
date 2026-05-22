import { TInputs } from "@/frontend/shared/types/form-field.types";
import { mergeClasses } from "../../../lib/utils/merge-classes";
import { InputNumber } from "antd";


const InputNumberr = ({control,field,status}:TInputs) =>{
    return(
        <InputNumber  
            {...control}
            min={0}
            // max={100}
            id={field.config.name}
            name={field.config.name}
            placeholder={field.config.placeholder}
            prefix={field.config.input.prefix} 
            className={mergeClasses(
                "custom-input",
                status.error && "!border-b-red-500 !border-2",
                field.config.input.class)}
            style={{ width: '100%' }}
        />
    )
}
export default InputNumberr;