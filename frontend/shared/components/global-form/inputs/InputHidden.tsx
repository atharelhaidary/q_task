import { mergeClasses } from "../../../lib/utils/merge-classes";
import { TInputs } from "../../../types/form-field.types";
import { Input } from "antd";
import { useEffect } from "react";

const  InputHidden = ({control,field,status}:TInputs) =>{
    const hiddenValue = field.config.input.value;
    useEffect(() => {
      if (hiddenValue !== undefined && hiddenValue !== control.value) {
        control.onChange(hiddenValue);
      }
    }, [hiddenValue, control]);
    return(
          <Input  
                  type="hidden"
                  {...control}
                  id={field.config.name}
                  name={field.config.name}
                  placeholder={field.config.placeholder}
                  className={mergeClasses(field.config.input.class)}
          />
    )
}
export default InputHidden