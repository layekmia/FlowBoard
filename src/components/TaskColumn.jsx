import { useState } from "react";
import { FaDeleteLeft, FaPlus } from "react-icons/fa6";
import AddTaskModal from "./AddTaskModal";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import useBoards from "../queryHook/useBoards";

function TaskItem({ task, boardId, deleteTask }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: String(task._id),
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full text-left grid grid-cols-[1fr_auto] items-center gap-3"
    >
      <p
        {...attributes}
        {...listeners}
        className="bg-gray-600 py-2 px-3 cursor-grab"
      >
        {task.title}
      </p>
      <button
        onClick={() => deleteTask({ boardId, taskId: task._id })}
        className="text-xl hover:text-red-400 transition"
      >
        <FaDeleteLeft />
      </button>
    </div>
  );
}

export default function TaskColumn({
  title,
  status,
  tasks,
  board,
  activeId,
  overId,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setNodeRef } = useDroppable({ id: status });
  const { deleteTask } = useBoards();

  // Filter tasks based on column status
  const filteredTasks = tasks?.filter((task) => task.status === status) || [];
  const onClose = () => setIsModalOpen(false);

  // Find dragged task
  const draggedTask = tasks.find((t) => t._id === activeId);

  // Task height assumption
  const taskHeight = 48;

  // Base height based on tasks
  let baseHeight = Math.max(filteredTasks.length * taskHeight, 50);

  // Adjust height for drag behavior
  if (activeId && draggedTask) {
    if (status === draggedTask.status && status !== overId) {
      // Source column → collapse height temporarily
      baseHeight = Math.max(baseHeight - taskHeight, 100);
    } else if (status === overId && status !== draggedTask.status) {
      // Target column → expand height temporarily
      baseHeight = baseHeight + taskHeight;
    }
  }

  return (
    <>
      <div className="p-5 bg-black text-white rounded">
        {/* Column Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold">{title}</h2>
          <button onClick={() => setIsModalOpen(true)} className="text-xl">
            <FaPlus />
          </button>
        </div>

        {/* Droppable Task Area */}
        <div
          ref={setNodeRef}
          className="flex flex-col gap-3 px-3 transition-all duration-200"
          style={{ minHeight: baseHeight }}
        >
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                boardId={board._id}
                deleteTask={deleteTask}
              />
            ))
          ) : (
            <p className="text-gray-400 text-sm">No {status} tasks</p>
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <AddTaskModal status={status} boardId={board._id} onClose={onClose} />
      )}
    </>
  );
}
