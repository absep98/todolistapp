import { useState } from "react";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";

export default function TodoItem({ task, onUpdateStatus, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="p-4 border rounded-md shadow-sm">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">{task.title}</h3>
          {isExpanded && (
            <p className="text-sm text-gray-500">{task.description}</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="p-2 text-gray-500 rounded-md hover:bg-gray-100"
            aria-label={`${isExpanded ? "Minimize" : "Expand"} task`}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-500 rounded-md hover:bg-gray-100"
            aria-label={`Delete task: ${task.title}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Details Section (Visible only when expanded) */}
      {isExpanded && (
        <div className="flex flex-col space-y-2 mt-4">
          <div className="flex items-center space-x-2">
            <select
              value={task.status}
              onChange={(e) => onUpdateStatus(e.target.value)}
              disabled={task.status === "done"}
              className={`px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-400 ${
                task.status === "done" ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
              aria-label={`Update status for: ${task.title}`}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
