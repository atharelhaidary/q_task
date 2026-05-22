import { EllipsisOutlined } from "@ant-design/icons";
import { memo } from "react";

type THeadingProps = {
    title: string | React.ReactNode;
    icon?: React.ReactNode;
    hasIcon?: boolean;
};

const Heading = memo(({
     title, 
    icon = <EllipsisOutlined style={{ fontSize: 27, color: 'var(--grayTextSecondary)', cursor: "pointer" }} /> ,
    hasIcon} :THeadingProps )=>{
        return(
                <div className="flex-wrap-container w-full items-center gap-y-4">
                    <h3 className="text-[20px] md:text-xl lg:text-3xl  flex-1">{title}</h3> 
                    { hasIcon && icon}
                </div>

        )
    
}) 
export default Heading