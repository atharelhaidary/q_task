
"use client"
import { useTaskCard } from "../../../hooks"
import { Spin, Tag } from "antd";
import { Loading, SmoothBtn } from "@/frontend/shared/components";
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { PRIORITY_STYLES, PRIORITY_TITLE } from "../../../constant/tasks.constant";
import EmptyCard from "./EmptyCard";
import { CardHeader } from "../..";

export default function TaskCard() {
    const { 
        isInitialLoading, 
        isRefreshing, 
        isUpdating, 
        isDragActive,
        tasksWithStatus, 
        onDragEnd, 
        onDragStart, 
        handleEdit, 
        handleDelete, 
        handleAddTask 
    } = useTaskCard();

    const showLoading = (isInitialLoading || isRefreshing ) && !isUpdating;
    if (showLoading) return <Loading />;

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {[0, 1, 2].map((status) => (
                    <Droppable key={status} droppableId={String(status)}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`drop-zone ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                            >
                                <CardHeader status={status} length={tasksWithStatus[status]?.length} />
                                <div className="w-full flex-col-container gap-4 flex-grow max-h-[calc(100vh-300px)] h-100 overflow-y-auto overflow-x-hidden scrollbar">
                                    {tasksWithStatus[status]?.length > 0 ? (
                                        tasksWithStatus[status].map((t, index) => (
                                            <Draggable key={t._id} draggableId={String(t._id)} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="card"
                                                        style={provided.draggableProps.style}
                                                    >
                                                        {isUpdating && isDragActive && (
                                                            <div className="absolute top-2 right-2">
                                                                <Spin size="small" />
                                                            </div>
                                                        )}
                                                        <div className="flex-center gap-3 justify-end cursor-pointer">
                                                            <EyeOutlined onClick={() => handleEdit(t._id)} />
                                                            <DeleteOutlined onClick={() => handleDelete(t._id)} />
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
                                                                <Tag 
                                                                    key={`${t._id}-${tag}-${idx}`} 
                                                                    className="!text-grayTextSecondary"
                                                                >
                                                                    {tag}
                                                                </Tag>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))
                                    ) : (
                                        <EmptyCard />
                                    )}
                                    {provided.placeholder}
                                </div>
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