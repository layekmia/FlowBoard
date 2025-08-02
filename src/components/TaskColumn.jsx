import { useState } from "react";
import { FaDeleteLeft, FaPlus } from "react-icons/fa6";
import AddTaskModal from "./AddTaskModal";
import useBoard from "../hook/useBoard";
import { useDroppable, useDraggable } from "@dnd-kit/core";

function TaskItem({ task, boardId, deleteTask }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: String(task.id),
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
        onClick={() => deleteTask(boardId, task.id)}
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
  const { deleteTask } = useBoard();
  const { setNodeRef, isOver } = useDroppable({ id: status });

  const filteredTasks = tasks?.filter((task) => task.status === status) || [];
  const onClose = () => setIsModalOpen(false);

  // Determine if dragged task belongs to this column (source)
  const draggedTaskIndex = tasks.findIndex((t) => t.id === Number(activeId));
  const draggedTask = draggedTaskIndex !== -1 ? tasks[draggedTaskIndex] : null;

  // Task height assumption (px)
  const taskHeight = 48;

  // Calculate minHeight based on drag state:
  // If this column is the source (has dragged task), shrink height by 1 task
  // If this column is the target (hovered column), increase height by 1 task
  // Else normal height = task count * taskHeight or minimum 150
  let baseHeight = Math.max(filteredTasks.length * taskHeight, 80);
  if (activeId && draggedTask) {
    if (status === draggedTask.status && status !== overId) {
      // source column — one task removed
      baseHeight = Math.max(baseHeight - taskHeight, 100);
    } else if (status === overId && status !== draggedTask.status) {
      // target column — one task added
      baseHeight = baseHeight + taskHeight;
    }
  }

  return (
    <>
      <div className="p-5 bg-black text-white">
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
                key={task.id}
                task={task}
                boardId={board.id}
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
        <AddTaskModal status={status} boardId={board.id} onClose={onClose} />
      )}
    </>
  );
}
