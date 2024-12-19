import React, { useEffect, useState } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
} from "@hello-pangea/dnd"; // Use this if you're using @hello-pangea/dnd
import axios from "axios"; // Assuming Axios is used for API calls
import { getTasks } from "../apicalls/task";

export default function KanbanBoard() {
    const [columns, setColumns] = useState([]);

    // Function to fetch tasks from the backend
    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            const tasks = response.data;

            // Transform backend response into column format
            const groupedTasks = {
                "pending": { id: "pending", title: "To Do", tasks: [] },
                "in-progress": { id: "in-progress", title: "In Progress", tasks: [] },
                "done": { id: "done", title: "Done", tasks: [] },
            };

            tasks.forEach((task) => {
                if (groupedTasks[task.status]) {
                    groupedTasks[task.status].tasks.push({
                        id: task._id,
                        content: task.title,
                    });
                }
            });

            setColumns(Object.values(groupedTasks));
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Fetch tasks on component mount
    useEffect(() => {
        fetchTasks();
    }, []);

    const onDragEnd = (result) => {
        const { source, destination } = result;

        // Dropped outside a valid destination
        if (!destination) return;

        const sourceColumn = columns.find((col) => col.id === source.droppableId);
        const destColumn = columns.find((col) => col.id === destination.droppableId);

        if (!sourceColumn || !destColumn) return;

        if (source.droppableId === destination.droppableId) {
            const updatedTasks = Array.from(sourceColumn.tasks);
            const [movedTask] = updatedTasks.splice(source.index, 1);
            updatedTasks.splice(destination.index, 0, movedTask);

            const updatedColumns = columns.map((col) =>
                col.id === sourceColumn.id ? { ...col, tasks: updatedTasks } : col
            );
            setColumns(updatedColumns);
        } else {
            const sourceTasks = Array.from(sourceColumn.tasks);
            const destTasks = Array.from(destColumn.tasks);
            const [movedTask] = sourceTasks.splice(source.index, 1);
            destTasks.splice(destination.index, 0, movedTask);

            const updatedColumns = columns.map((col) => {
                if (col.id === sourceColumn.id) return { ...col, tasks: sourceTasks };
                if (col.id === destColumn.id) return { ...col, tasks: destTasks };
                return col;
            });
            setColumns(updatedColumns);
        }
    };

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <div className="w-full max-w-5xl">
                <h1 className="text-3xl font-bold mb-8 text-center">Kanban Board</h1>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex space-x-4">
                        {columns.map((column) => (
                            <Droppable key={column.id} droppableId={column.id}>
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="min-h-[200px] p-4 bg-gray-200 rounded-lg w-[300px]"
                                    >
                                        <h2 className="text-lg font-semibold mb-2">{column.title}</h2>
                                        {column.tasks.map((task, index) => (
                                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="mb-2 p-2 bg-white rounded shadow-md"
                                                    >
                                                        {task.content}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
}
