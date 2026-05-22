import { Input } from "antd";
import { mergeClasses } from "../../../lib/utils/merge-classes";
import { TInputs } from "../../../types/form-field.types";


const InputTextArea = ({control,field,status}:TInputs) =>{
    return(
        <Input.TextArea 

                        {...control} 
                        id={field.config.name}
                        name={field.config.name}
                        placeholder={field.config.placeholder}  
                        autoSize={{ minRows: field.config.input.rows, maxRows: 50}} 
                        className={mergeClasses(
                            "custom-input",
                            status.error && "!border-b-red-500 !border-2",
                            field.config.input.class
                        )}
         />
    )
}
export default InputTextArea;