import { DatePicker } from "antd";
import dayjs from "dayjs";
import { TInputs } from "../../../types/form-field.types";
import { mergeClasses } from "../../../lib/utils/merge-classes";

const Date = ({control,field}:TInputs) =>{
    const { name, input, placeholder } = field.config
    const { class: classInput , disabled } = input 
    const handleChange = (date: any) => {
        control.onChange(date?.$d);
      };
    return(
    <DatePicker
            style={{ width: "100%" }}
            id={name}
            name={name}
            className={mergeClasses("custom-input",classInput)}
            value={control.value ? dayjs(control.value) : null}
            onChange={handleChange}
            placeholder={placeholder}
            disabledDate={(current) => current && current < dayjs().startOf('day')}
            disabled={disabled}
     />
    )
}
export default Date;