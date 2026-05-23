import { TITLE_STYLE, TASK_TITLE } from '@/frontend/modules/tasks/constant'
import { memo } from "react";

interface ICardHeaderProps {
    status : number
    length : number
}

const CardHeader = memo(({ status, length }: ICardHeaderProps) => {
    return (
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