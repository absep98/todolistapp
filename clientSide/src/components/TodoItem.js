import { Trash2 } from 'lucide-react';

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
        id={`todo-${todo.id}`}
        className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={`flex-grow cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
      >
        {todo.text}
      </label>
      <button
        onClick={onDelete}
        className="p-2 text-gray-500 rounded-md hover:bg-gray-100"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
