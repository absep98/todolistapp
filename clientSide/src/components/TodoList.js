import { useState, useCallback, useEffect } from "react";
import { Plus } from "lucide-react";
import TodoItem from "./TodoItem";
import { addTask, getTasks } from "../apicalls/task";
function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");


  useEffect(() => {
    const fetchTasks = async() => {
      try {
        const response = await getTasks();
        console.log(response);
      } catch (error) {
        console.log(error)
      }
    };

    fetchTasks();
  },[])

  const handleAddTask = async(values) => {    
    if (newTask.title.trim() === "") {
      setError("Task title is required.");
      return;
    }
    setError("");
    const taskData = {
      title: newTask.title,
      description: newTask.description,
      status: "pending"
    }
    console.log(taskData);
    try {
      const response = await addTask(taskData);
      console.log('response ', response);
      setTasks((prevTasks) => [
        ...prevTasks,
        taskData
      ]);
      setNewTask({ title: "", description: "" });

    } catch (error) {
      console.log('got error ', error);
      
    }
    
  };

  const updateTaskStatus = useCallback((id, status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

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
        {filteredTasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onUpdateStatus={(status) => updateTaskStatus(task.id, status)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
