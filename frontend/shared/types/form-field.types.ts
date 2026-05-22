import { Control, ControllerRenderProps, FieldValues } from "react-hook-form"

export type TField = {
 config : { 
    wrapperFormItem?: string
    name: string | any,
    label?: {
        value:string
        icons?: {
          leftIcon?: {
            key : React.ReactNode,
            value : string
          } ,
          rightIcon?: {
            key : React.ReactNode,
            value : string
          } 
        },
        class?: string
    },
    input: {
        type:"input" | "number" | "password" | "email" | "select" | "textarea" | "checkbox" | "radio" | "date" | 'time' | 'file' | "hidden" | "otp",
        icons?:{
          leftIcon?: React.ReactNode,
          rightIcon?: React.ReactNode,
        },
        value?: number | string,
        rows?: number,
        class?:string,
        accept?:string,
        multiple?: boolean,
        length?: number,
        size?: "large" | "middle" | "small",
        prefix ?: React.ReactNode,
        suffix ?: React.ReactNode,
        options?: { label: string; value: string | number }[],
        loading ? : boolean;
        disabled ? : boolean;
      },
    loadMore ?: () => void, 
    hasNextPage ?:  boolean, 
    placeholder?: string,
    rules?: any;
 }
}




export type TInputs = {
  control : ControllerRenderProps<FieldValues, string>
  field : TField
  originalControl?: Control<FieldValues>
  status: {
    error: boolean
  }
}