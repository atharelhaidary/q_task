import { mergeClasses } from "../../../lib/utils/merge-classes";
import { TInputs } from "../../../types/form-field.types";
import { Input } from "antd";


const InputText = ({control,field,status}:TInputs) =>{
    const { name , input, placeholder } = field.config || {}
    const { prefix, class: classInput, disabled }= input || {}
    return(
        <Input  
            {...control}
            id={name}
            name={name}
            placeholder={placeholder}
            prefix={prefix} 
            className={mergeClasses(
                "custom-input",
                status.error && "!border-b-red-500 !border-2",
                classInput)}
            disabled = {disabled}
        />
    )
}
export default InputText;