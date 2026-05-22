import { Radio } from "antd";
import { TInputs } from "../../../types/form-field.types";

const RadioBtn = ({control,field}:TInputs) =>{
    const { name, input, wrapperFormItem }= field.config || {}
    return(
    <div role="radiogroup" aria-labelledby={`${name}`} className="group">
        <Radio.Group
            name={name}
            id={name}
            onChange={(e) => control.onChange(e.target.value)}
            value={control.value}
            className={wrapperFormItem}
        >
                {input.options?.map((option, index) => (
                <Radio
                    key={`${name}-${option.value}-${index}`}
                    id={`${name}-${option.value}`} 
                    value={option.value}
                >
                    {option.label}
                </Radio>
                ))}
        </Radio.Group>
    </div>
    )
}
export default RadioBtn;