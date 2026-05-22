import { Input } from "antd";
import { mergeClasses } from "../../../lib/utils/merge-classes";
import { TInputs } from "../../../types/form-field.types";


const InputEmail = ({control,field,status}:TInputs) =>{
    return(
        <Input  
            {...control}
            id={field.config.name}
            name={field.config.name}
            type="email"
            placeholder={field.config.placeholder} 
            className={mergeClasses(
                "custom-input",
                status.error && "!border-b-red-500 !border-2",
                field.config.input.class
            )}
      
        />
    )
}
export default InputEmail;