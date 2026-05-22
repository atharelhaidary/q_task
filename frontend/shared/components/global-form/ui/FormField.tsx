"use client"
import { useFormContext,Controller, FieldValues, ControllerRenderProps, Control} from "react-hook-form";
import { Form, Input} from "antd";
import { RenderLabel } from "./RenderLabel";
import { InputHidden, InputPassword, InputTextArea, RadioBtn, Date, Time, InputText, InputEmail, SelectBox,File, InputNumberr } from "../inputs";
import { TField } from "../../../types/form-field.types";
import { mergeClasses } from "../../../lib/utils/merge-classes";
export const FormField = ({config}:{config:TField}) => {
    
    const renderField = (field: TField, controllerProps: ControllerRenderProps<FieldValues, string>,status:any, control:Control<FieldValues>) => {
      const { type, length, size, class: classOtp } = field.config.input
      switch (type) {
        case "hidden":
          return <InputHidden control={controllerProps} field={field} status={status}/>
        case "input":
          return <InputText  control={controllerProps} field={field} status={status}/>
        case "email":
          return <InputEmail control={controllerProps} field={field} status={status}/>
        case "number":
           return <InputNumberr control={controllerProps} field={field} status={status}/>
        case "password":
          return <InputPassword control={controllerProps} field={field} status={status}/>
        case "textarea":
          return <InputTextArea control={controllerProps} field={field} status={status}/>
        case "radio":
           return <RadioBtn control={controllerProps} field={field} status={status}/>
        case "date":
             return <Date control={controllerProps}  field={field} status={status}/>
        case "time":
           return <Time control={controllerProps} field={field} status={status}/> 
        case "otp" :
          return <Input.OTP {...controllerProps} length={length} size={size}  className={classOtp} /> 
        // case "checkbox":
        //   return <Checkbox checked={controllerProps.value} onChange={(e) => controllerProps.onChange(e.target.checked)}>{field.config.placeholder} </Checkbox>         
        case "file":
          return  <File 
                    control={controllerProps}
                    originalControl={control}
                    field={field}
                    status={status}
                    />
        case "select":
          return <SelectBox control={controllerProps} field={field} status={status}/>
        default:
              return<></>; 
      }
    };  

    const { control } = useFormContext();
    const { type } = config.config.input
    return(
                      <Controller
                          name={config.config.name}
                          control={control}
                          rules={config?.config?.rules}
                          render={({ field: controllerProps, fieldState }) => (
                            <Form.Item 
                              className={mergeClasses(`${type === "hidden" && fieldState.error ? "block !-mt-8" : type === "hidden" &&"hidden" } !w-full !h-full !relative`, config.config.wrapperFormItem)} 
                              key={`${config.config.name}}`}
                              id={config.config.name}
                              {...(config.config.input.type !== 'radio' &&  { htmlFor: config.config.name })}
                              
                              // ⭐ Ant Design error handling
                              validateStatus={fieldState.error ? "error" : undefined}
                              help={fieldState.error?.message}
                            >  
                              <RenderLabel config={config}/>
                              {renderField(config, controllerProps, fieldState, control)}
                            </Form.Item>
                          )}
                         />)
            
  }



