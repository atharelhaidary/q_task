"use client"
import { DarkModeToggle, Heading, QuickSearch, SmoothBtn} from "@/frontend/shared/components";
import { Popover, Space} from "antd";
import { usePopup } from "@/frontend/shared/context";
import { PopupSort, PopupFilter,  headerBtns} from "../..";
import { PAGINATION_KEYS } from "@/frontend/shared/constants";
import { usePagination } from "@/frontend/shared/context/PaginationContext";
export default  function PageHeader () {
    const { paginationKey , } = usePagination(PAGINATION_KEYS.TASKS);
    const { resetKeys } = paginationKey || {}

    const { showPopup } = usePopup();
    return(
        <Heading 
            title="Task Management"
            hasIcon={true}
            icon={
            <div className="flex-wrap-container items-center w-full lg:w-fit justify-end gap-y-4 gap-6">
                <QuickSearch id={PAGINATION_KEYS.TASKS}/>
                <Space vertical>
                    <Space wrap>
                        {headerBtns.map((item) => {
                            const isActive =  resetKeys?.some((key)=> key.keyType === item.type)
                            return (
                                <Popover
                                content= {item.type === "filter" ? <PopupFilter item={headerBtns?.[0]}/> : item.type === "sort" && <PopupSort item={headerBtns?.[1]} />}
                                trigger="click"
                            >

                                    <div>
                                            <SmoothBtn 
                                                htmlType="button"
                                                btnStyle={`!bg-none !bg-yellowColor !p-2 !rounded-full mt-2 ${isActive && "apply-filter"}`}
                                                children={item.icon}
                                                onClick={()=> 
                                                    showPopup(item.onClick) 
                                                }
                                            />
                                    </div>
                                </Popover>
                                
                        )})}
                    </Space>
                </Space>
                <DarkModeToggle/>
            </div>
            }
        />
    )
}