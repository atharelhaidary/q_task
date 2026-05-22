import { Button } from "antd"
import React, { memo } from "react";
import { mergeClasses } from "../../lib/utils/merge-classes";


type TSmoothBtn = {
    title?:string;
    titleStyle?: string;
    children?: React.ReactNode;
    btnStyle? :string;
    hoverColor?:any;
    onClick? : () => void;
    htmlType? : "submit" | "button" | "reset"
    form?:string
    type?: "default" | "primary" | "dashed" | "link" | "text";
}

const styles : Record<NonNullable<TSmoothBtn['type']>, string>= {
    text : "btn-text",
    default:"",
    primary: "primary-btn",
    dashed:"",
    link:""
}


const SmoothBtn = memo(({btnStyle, title, hoverColor, onClick, titleStyle, children, htmlType="submit", type="primary",form}:TSmoothBtn) => {
    return(
        <Button 
            type={type}
            htmlType={htmlType}
            className={mergeClasses( styles[type],btnStyle)}
            onClick={onClick}
            form={form}
         >
                {/* title only */}
                {title && (
                    <span 
                            className={titleStyle}
                    >
                            {title}
                    </span>

                )}
              
                 {/* children only*/}
                 { children && children }
                
                {/* animation */}
                { 
                    type !== "text" && (
                        <div 
                                className={
                                    mergeClasses("hoverBtn-overlay",hoverColor) 
                                }
                        ></div>

                    )
                }
                
        </Button>
    )
})
export default SmoothBtn;