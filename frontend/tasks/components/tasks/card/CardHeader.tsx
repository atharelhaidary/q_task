import { TASK_TITLE, TITLE_STYLE } from "@/frontend/tasks/constant/tasks.constant";
import { memo } from "react";

interface ICardHeaderProps {
    status : number
    length : number
}

const CardHeader = memo(({ status, length }: ICardHeaderProps) => {
    return (
        // card header
        <div className="card-header">
            <div className={`${TITLE_STYLE[status]} rounded-full w-[10px] h-[10px]`} />
            <h4>
                {TASK_TITLE[status]}
            </h4>
            <span className="text-gray-500 text-sm">{length || 0}</span>
        </div>
    );
});

export default CardHeader;