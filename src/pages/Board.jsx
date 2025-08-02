import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import useBoard from "../hook/useBoard";
import TaskColumn from "../components/TaskColumn";
import { FaArrowLeft } from "react-icons/fa6";

export default function Board() {
  const { id } = useParams();
  const { boards, updateTaskStatus } = useBoard();
  const board = boards.find((board) => board.id === Number(id));
  const navigate = useNavigate();

  // Track dragging task and hover column
  const [activeId, setActiveId] = useState(null); // dragged task id
  const [overId, setOverId] = useState(null); // hovered column id (status)

  const handleDragStart = ({ active }) => {
    setActiveId(active.id);
  };

  const handleDragOver = ({ over }) => {
    setOverId(over ? over.id : null);
  };

  const handleDragEnd = ({ active, over }) => {
    if (over && active.id !== over.id) {
      updateTaskStatus(board.id, Number(active.id), over.id);
    }
    setActiveId(null);
    setOverId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setOverId(null);
  };

  return (
    <div className="bg-[#1D1F26] min-h-screen">
      <NavBar />

      <div className="max-w-[1320px] mx-auto mt-5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white hover:text-gray-400 transition mb-5"
        >
          <FaArrowLeft />
          <span>Go Back</span>
        </button>
      </div>

      <DndContext
        modifiers={[restrictToWindowEdges]}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="max-w-[1320px] mx-auto grid grid-cols-3 gap-5 mt-5 items-start">
          <TaskColumn
            title="Todos"
            status="todo"
            tasks={board?.tasks || []}
            board={board}
            activeId={activeId}
            overId={overId}
          />
          <TaskColumn
            title="Progress"
            status="progress"
            tasks={board?.tasks || []}
            board={board}
            activeId={activeId}
            overId={overId}
          />
          <TaskColumn
            title="Completed"
            status="completed"
            tasks={board?.tasks || []}
            board={board}
            activeId={activeId}
            overId={overId}
          />
        </div>
      </DndContext>
    </div>
  );
}
