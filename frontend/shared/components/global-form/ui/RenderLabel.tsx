import { usePopup } from "@/frontend/shared/context";
import { mergeClasses } from "../../../lib/utils/merge-classes";
import { TField } from "../../../types/form-field.types";


export const RenderLabel = ({config}: {config:TField}) => {
  const { showPopup } = usePopup()
  const { input , label, name } = config.config
  const { leftIcon, rightIcon  } = label?.icons || {}
    if (input?.type === 'radio') {
      return (
        <fieldset className="!h-[12px] !border-none" id={name}>
          <legend className="h-full flex items-center gap-2 !border-none">
            {leftIcon?.key}
            <span className={mergeClasses(" text-md !flex-1 text-secondaryText", label?.class)}>
              {label?.value}
            </span>
            {rightIcon?.key}
          </legend>
        </fieldset>
      );
    }
    
    return (
      <div className={mergeClasses("flex gap-2 !w-full items-center pb-3")} >
        {leftIcon?.key}
        <label 
          htmlFor={name}
          className={mergeClasses("text-md !flex-1 text-secondaryText font-semibold", label?.class)}
        >
          {label?.value}
        </label>
        {rightIcon?.key && (
                <div 
                    onClick={() => showPopup(rightIcon.value)} 
                    className="cursor-pointer hover:scale-[2] transform transition-transform duration-300 ease-in-out text-secondaryText"

                >
                    {rightIcon.key}
                </div>
        )}
      </div>
    );
};
  