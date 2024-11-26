import { useState } from 'react';
import { Plus } from 'lucide-react';
import TodoItem from './TodoItem';
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold text-center">My Todo List</h2>
      </div>
   
      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
          className="flex w-full space-x-2"
        >
          <input
            type="text"
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            type="submit"
            className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </button>
        </form>
      </div>
      <div className="p-4 space-y-2">
        {todos.map((todo) => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onToggle={() => toggleTodo(todo.id)} 
            onDelete={() => deleteTodo(todo.id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
