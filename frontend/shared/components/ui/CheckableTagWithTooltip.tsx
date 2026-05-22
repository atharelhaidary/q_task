import { Tooltip } from "antd"
import { memo, useCallback } from "react";

type TCheckableTagWithTooltip = {
    selectedKeys :any
    setSelectedKeys : any
    type : string
}

const CheckableTagWithTooltip = memo(({selectedKeys, setSelectedKeys, type }: TCheckableTagWithTooltip) => {

    const swapItems = useCallback(() => {
        const result = [...selectedKeys];
        [result[0], result[1]] = [result[1], result[0]];
        setSelectedKeys(result)
    },[selectedKeys,])
    return(
    <Tooltip 
        title={
           type === "sort" &&
            <div>
                <div className="font-bold mb-1">Current {type} Rules:</div>
                {selectedKeys.length === 0 ? (
                    <div>No active {type}</div>
                ) : (
                    selectedKeys.map((sort, idx) => (
                        <div key={idx}> 
                           •{idx+1} : 
                           {sort?.value?.sortBy}: {sort?.value?.sortOrder === 1 ? 'Ascending ↑' : 'Descending ↓'  }
                        </div>
                    ))
                )}
                <div className="text-xs text-gray-300 mt-2 border-t pt-1">Click options below to change</div>
            </div>
        }
        placement="topRight"
    >
        <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg cursor-help mb-2">
            <span className="font-semibold">📊 {type} Options</span>
            {selectedKeys.length > 0 && (
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {selectedKeys.length}
                </span>
            )}
            <span className="text-gray-400 text-sm">ⓘ</span>
          
        </div>
        {selectedKeys.length >= 2 && type === "sort" && (
            <div className="mt-3 pt-2 border-t border-gray-200">
                <button
                    onClick={swapItems}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 group"
                >
                    <svg 
                        className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                    <span>Swap Sort Priority</span>
                </button>
            </div>
       )}
    </Tooltip>
    )
})
export default CheckableTagWithTooltip;