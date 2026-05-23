
import { useCallback, useMemo, useRef, useState } from "react";
import { useGetTasks, useUpdateTask } from ".";
import { generateFormData } from "@/frontend/shared/lib";
import { POPUP } from "@/frontend/shared/constants";
import { usePopup } from "@/frontend/shared/context";

export const useTaskCard = () => {
    const [isDragActive, setIsDragActive] = useState(false);
    const isDragInProgress = useRef(false);


    const { showPopup } = usePopup();
    const { data, isFetching, isLoading, finalParams } = useGetTasks({
        data: { pagination: false, }
    });
    const { mutate: updateTask, isPending: isUpdating } = useUpdateTask({params: finalParams});
    const { data: tasks } = data || {};

    const isInitialLoading = isLoading;
    const isRefreshing = isFetching && !isLoading && !isDragActive;

    const tasksWithStatus = useMemo(() => {
        const result = { 0: [], 1: [], 2: [] };
        if (tasks && Array.isArray(tasks)) {
            tasks.forEach((taskItem) => {
                const status = taskItem?.status;
                if (status === 0 || status === 1 || status === 2) {
                    result[status].push(taskItem);
                }
            });
        }
        return result;
    }, [tasks]);

    const tasksRef = useRef(tasks);
    tasksRef.current = tasks;

    const onDragEnd = useCallback((result: any) => {
        const { source, destination, draggableId } = result;
        const currentTasks = tasksRef.current;
        const existingTask = currentTasks?.find((task) => String(task._id) === String(draggableId));

        isDragInProgress.current = false;

        if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
            setIsDragActive(false);
            return;
        }

        const formData = new FormData();
        const apiFormData = generateFormData(formData, {
            ...existingTask,
            tags: existingTask?.tags?.join(",") || existingTask?.tags?.join(" ") || "",
            status: destination.droppableId
        });

        updateTask(apiFormData,);
    }, [updateTask]);

    const onDragStart = useCallback(() => {
        isDragInProgress.current = true;
        setIsDragActive(true);
    }, []);

    const handleEdit = useCallback((id: string) => {
        showPopup(POPUP.TASKS.UPDATE, { data: { id } });
    }, [showPopup]);

    const handleDelete = useCallback((id: string) => {
        showPopup(POPUP.TASKS.DELETE, { data: { ids: [id] } });
    }, [showPopup]);

    const handleAddTask = useCallback((status: number) => {
        showPopup(POPUP.TASKS.ADD, { data: { status } });
    }, [showPopup]);

    return {
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
    };
};