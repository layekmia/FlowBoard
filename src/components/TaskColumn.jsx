import { useState } from "react";
import { FaDeleteLeft, FaPlus } from "react-icons/fa6";
import AddTaskModal from "./AddTaskModal";
import useBoard from "../hook/useBoard";

export default function TaskColumn({ title, status, tasks, board }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filteredTasks = tasks?.filter((task) => task.status === status) || [];

  const {deleteTask} = useBoard();

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="p-5 bg-black text-white">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold">{title}</h2>
          <button onClick={() => setIsModalOpen(true)} className="text-xl">
            <FaPlus />
          </button>
        </div>

        <div className="flex items-center flex-col gap-3 px-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task.title}
                className="w-full text-left grid grid-cols-[1fr_auto] items-center gap-3"
              >
                <p className="bg-gray-600 py-2 px-3">{task.title}</p>
                <button onClick={() => deleteTask(board.id, task.id)} className="text-xl">
                  <FaDeleteLeft />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No {status} tasks</p>
          )}
        </div>
      </div>
      {isModalOpen && (
        <AddTaskModal status={status} boardId={board.id} onClose={onClose} />
      )}
    </>
  );
}
