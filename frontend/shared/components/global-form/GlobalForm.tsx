import { FieldValues, SubmitHandler, useFormContext} from "react-hook-form";
import SmoothBtn from "../ui/SmoothBtn";
import { Form } from "antd";
import { usePopup } from "../../context";
import { mergeClasses } from "../../lib/utils/merge-classes";
import { memo, useCallback } from "react";


type Props= {
  id:string
  children : React.ReactNode;
  formClassName?: string;
  onSubmit?: SubmitHandler<FieldValues>;
  formLayoutStyle?: "horizontal" | "inline" | "vertical" ;
  submit?: {
    text?:string,
    class?:string,
    icon?: React.ReactNode
  }
  hasBtn ? : boolean
};


const GlobalForm = memo(({id, children, onSubmit, submit = {text:"submit"}, formClassName, formLayoutStyle,hasBtn=true}: Props)=>{
  const methods = useFormContext();
  const { handleSubmit } = methods
  const {text, icon, class : btnClass} = submit;
  const [form] = Form.useForm();
  const { showPopup } = usePopup()


 

  const handleSubmitForm = useCallback(async(data: FieldValues) => {
    if (!onSubmit) return; 
    showPopup("loading");
    await onSubmit(data);
}, [onSubmit, showPopup]);
  
  return (
     <Form 
         id={id}
         form={form}
         layout={formLayoutStyle}  
         className={formClassName}
         onFinish={hasBtn ? handleSubmit(handleSubmitForm) : undefined} 
      >
          {/* form items */}
          {children}
          {/* button */}
          {
            hasBtn && 
                <SmoothBtn 
                    form={id}
                    htmlType="submit" 
                    btnStyle={mergeClasses(btnClass)}
                >
                  {
                    text && icon ? 
                      <div className="flex-center gap-2">
                        {text}
                        {icon && icon}
                      </div> :  text
                  }
              </SmoothBtn>
          }
          
      </Form>
  );
})
export default GlobalForm;
