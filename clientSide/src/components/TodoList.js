import { useState, useCallback, useEffect } from "react";
import { Plus } from "lucide-react";
import TodoItem from "./TodoItem";
import { addTask, getTasks, updateTask, deleteTask } from "../apicalls/task";
function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        console.log(response);
        
        setTasks(response.data);
      } catch (error) {
        console.log(error)
      }
    };

    fetchTasks();
  }, [])

  const handleAddTask = async (values) => {
    if (newTask.title.trim() === "") {
      setError("Task title is required.");
      return;
    }
    const taskData = {
      title: newTask.title,
      description: newTask.description,
      status: "pending"
    }
    try {
      const response = await addTask(taskData);
      console.log('response after adding ', response);
      setTasks((prevTasks) => [
        ...prevTasks,
        response.data
      ]);
      setNewTask({ title: "", description: "" });
      setError("");
    } catch (error) {
      console.log('got error ', error);

    }

  };

  const handleEditTask = async (taskId, updatedData) => {
    try {
      const response = await updateTask(taskId, updatedData);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId 
            ? { ...task, ...updatedData } // Spread the updated data
            : task
        )
      );
      setEditingTask(null);
    } catch (error) {
      console.log('Error editing task:', error);
    }
  };
  const updateTaskStatus = useCallback(async (taskId, newStatus) => {
    if (!taskId) {
      console.error('No task ID provided');
      return;
    }
    try {
      // Add console.log to debug the request
      console.log('Updating task:', taskId, 'with status:', newStatus);
      
      const response = await updateTask(taskId, { status: newStatus });
      
      // Add console.log to see the response
      console.log('Update response:', response);
      
      // Update the tasks state immediately with the new status
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId 
            ? { ...task, status: newStatus } // Update the status directly
            : task
        )
      );
    } catch (error) {
      console.error('Error updating task status:', error.response || error);
    }
  }, []);

  const handleDeleteTask = useCallback(async (taskId) => {
    try {
      console.log("Attempting to delete task with ID:", taskId);
  
      // Wait for the delete API to respond
      await deleteTask(taskId);
  
      // Only update the state after successful deletion
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((task) => task._id !== taskId);
        console.log("Remaining tasks after deletion:", updatedTasks);
        return updatedTasks;
      });
  
      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }, []);
  
  console.log(tasks)


  const filteredTasks = tasks.filter((task) =>
    filter === "all" ? true : task.status === filter
  );
  
  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold text-center">My Todo List</h2>
      </div>

      <div className="p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTask();
          }}
          className="space-y-4"
        >
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            aria-label="Task title"
          />
          <input
            type="text"
            placeholder="Task description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            aria-label="Task description"
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </button>
        </form>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="filter" className="font-semibold">
            Filter by:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-400"
          >
            <option value="all">All</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        {filteredTasks.map((task, index) => {          
          return (
            <TodoItem
            key={task._id || index}
            task={task}
            onUpdateStatus={(status) => {
              if (task._id) {
                updateTaskStatus(task._id, status);
              }
            }}
            onDelete={() => task._id && handleDeleteTask(task._id)}
            onEdit={() => setEditingTask(task)}
            isEditing={editingTask?._id === task._id}
            onSave={handleEditTask}
          />
          )
        }
          
        )}
      </div>
    </div>
  );
}

export default TodoList;
