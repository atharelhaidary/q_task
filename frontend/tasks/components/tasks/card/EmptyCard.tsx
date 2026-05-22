import {  PlusOutlined } from '@ant-design/icons';

export default function EmptyCard () {
    return(
    <div className="flex-center flex-col flex-grow gap-2 min-h-[200px]">
        <div className="border-4 border-borderColor rounded-full w-[50px] h-[50px] flex-center">
            <PlusOutlined style={{color:'var(--borderColor' , fontSize: '25px'}} className="bold"/>
        </div>
        <span className="text-grayTextSecondary">No Tasks</span>
    </div>
    )
}