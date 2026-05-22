import {  TimePicker } from "antd";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";
import { TInputs } from "../../../types/form-field.types";


const Time = ({control,field}:TInputs) =>{
    const { clearErrors } = useFormContext()
    return(
        <TimePicker
                use12Hours
                format="hh:mm A"
                id={field.config.name}
                name={field.config.name}
                className="custom-input !w-[100%]"
                placeholder={field.config.placeholder}
                value={control.value ?dayjs(control.value, "hh:mm A") : null}
                onChange={(time) => control.onChange(time ? time.format("hh:mm A") : "")}
                onOpenChange={(open) => {
                    if (open) {
                      clearErrors(field.config.name);
                    }
                }}
         />
    )
}
export default Time;