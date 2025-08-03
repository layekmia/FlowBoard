import { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import TaskColumn from "../components/TaskColumn";
import { FaArrowLeft } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { getBoardById } from "../utils/BoardApi";
import Spinner from "../components/Spinner";
import useBoards from "../queryHook/useBoards";

export default function Board() {
  const { id } = useParams();
  const { data: board, isLoading } = useQuery({
    queryKey: ["board", id],
    queryFn: () => getBoardById(id),
  });

  const { updateTaskStatus } = useBoards();
  const navigate = useNavigate();

  // Local state for immediate UI sync
  const [localTasks, setLocalTasks] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);

  // Sync local state when backend data changes
  useEffect(() => {
    if (board?.tasks) setLocalTasks(board.tasks);
  }, [board]);

  const handleDragStart = ({ active }) => {
    setActiveId(active.id);
  };

  const handleDragOver = ({ over }) => {
    setOverId(over ? over.id : null);
  };

  const handleDragEnd = ({ active, over }) => {
    if (over && active.id !== over.id) {
      // 1️⃣ Optimistically update UI
      setLocalTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === active.id ? { ...task, status: over.id } : task
        )
      );

      // 2️⃣ Send request to backend
      updateTaskStatus({
        boardId: board._id,
        taskId: active.id,
        status: over.id,
      });
    }

    setActiveId(null);
    setOverId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setOverId(null);
  };

  if (isLoading) return <Spinner />;

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
            tasks={localTasks}
            board={board}
            activeId={activeId}
            overId={overId}
          />
          <TaskColumn
            title="Progress"
            status="progress"
            tasks={localTasks}
            board={board}
            activeId={activeId}
            overId={overId}
          />
          <TaskColumn
            title="Completed"
            status="completed"
            tasks={localTasks}
            board={board}
            activeId={activeId}
            overId={overId}
          />
        </div>
      </DndContext>
    </div>
  );
}
