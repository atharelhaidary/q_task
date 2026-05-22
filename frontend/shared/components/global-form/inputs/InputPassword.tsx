import { Input } from "antd";

import { mergeClasses } from "../../../lib/utils/merge-classes";
import { TInputs } from "../../../types/form-field.types";

const InputPassword = ({control,field,status}:TInputs) =>{
    return(
        <Input.Password  
            {...control}
            id={field.config.name}
            name={field.config.name}
            placeholder={field.config.placeholder} 
            className={mergeClasses(
                "custom-input",
                status.error && "!border-b-red-500 !border-2",
                field.config.input.class
            )}
            // style={{
            //     border: 'none',
            //     outline: 'none',
            //     boxShadow: 'none'
            // }}      
         />
    )
}
export default InputPassword;