"use client"
import { useCallback, useMemo} from "react";
import { useGetTasks, useUpdateTask } from "../../../hooks"
import { Tag } from "antd";
import { Loading, SmoothBtn} from "@/frontend/shared/components";
import { EyeOutlined, DeleteOutlined} from '@ant-design/icons';
import { usePopup } from "@/frontend/shared/context";
import { POPUP } from "@/frontend/shared/constants";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { generateFormData } from "@/frontend/shared/lib";
import { PRIORITY_STYLES, PRIORITY_TITLE} from "../../../constant/tasks.constant";
import EmptyCard from "./EmptyCard";
import { CardHeader } from "../..";

export default function TaskCard() {
    const { showPopup } = usePopup();
    const { data, isFetching, isLoading  } = useGetTasks({
        data: { pagination: false }
    });
    const { mutate : updateTask } = useUpdateTask()
    const { data: tasks } = data || {};
    
    const tasksWithStatus = useMemo(() => {
        const result = { 0: [], 1: [], 2: [] };
        tasks?.forEach((taskItem) => {
            const status = taskItem?.status;
            if (status === 0 || status === 1 || status === 2) {
                result[status].push(taskItem);
            }
        });
        return result;
    }, [tasks]);


    // drag and drop function
    const onDragEnd = useCallback((result: any) => {
        const { source, destination, draggableId } = result;
        const existingTask = tasks?.find((task)=> String(task._id) == String(draggableId))
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;
        const formData = new FormData();
        const apiFormData = generateFormData(formData,{
            ...existingTask,
            tags : existingTask.tags.join(",") || existingTask.tags.join(" "),
            status : destination.droppableId 
        })
        updateTask(apiFormData);
    }, [tasks]);




    const handleEdit = useCallback((id: string) => {
        showPopup(POPUP.TASKS.UPDATE, { data: { id } });
    }, [showPopup]);

    const handleDelete = useCallback((id: string) => {
        showPopup(POPUP.TASKS.DELETE, { data: { ids: [id] } });
    }, [showPopup]);

    const handleAddTask = useCallback((status: number) => {
        showPopup(POPUP.TASKS.ADD, { data: { status } });
    }, [showPopup]);

    if (isLoading || isFetching) return <Loading />;
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {[0, 1, 2].map((status) => (
                    <Droppable key={status} droppableId={String(status)}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                               className={`drop-zone ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                            >
                                {/* Header */}
                                <CardHeader status={status} length={tasksWithStatus[status]?.length}/>
                                {/* Tasks Container */}
                                <div className="w-full flex-col-container gap-4 flex-grow max-h-[calc(100vh-300px)] h-100 overflow-y-auto overflow-x-hidden scrollbar">
                                    {tasksWithStatus[status]?.length > 0 ? (
                                        tasksWithStatus[status].map((t, index) => (
                                            <Draggable key={t._id} draggableId={String(t._id)} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="card"
                                                        style={provided.draggableProps.style}
                                                    >
                                                        <div className="flex-center gap-3 justify-end cursor-pointer">
                                                            <EyeOutlined onClick={() => handleEdit(t._id)} />
                                                            <DeleteOutlined onClick={() => handleDelete(t._id)}/>
                                                        </div>
                                                        <span className="font-semibold">{t.title}</span>
                                                        <p className="text-grayTextSecondary text-sm line-clamp-2">
                                                            {t.desc || 'No description'}
                                                        </p>
                                                        <div className="flex-wrap-container gap-3">
                                                            <Tag className={PRIORITY_STYLES[t.priority]}>
                                                                {PRIORITY_TITLE[t.priority]}
                                                            </Tag>
                                                            {t.tags?.map((tag, idx) => (
                                                                <Tag key={`${t._id}-${tag}-${idx}`} className="!text-grayTextSecondary">
                                                                    {tag}
                                                                </Tag>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))
                                    ) : (
                                        <EmptyCard/>
                                    )}
                                    {provided.placeholder}
                                </div>

                                {/* Add Button */}
                                <SmoothBtn
                                    htmlType="button"
                                    onClick={() => handleAddTask(status)}
                                    btnStyle="mt-4"
                                >
                                    + Add Task
                                </SmoothBtn>
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
}