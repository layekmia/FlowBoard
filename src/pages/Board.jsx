import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import useBoard from "../hook/useBoard";
import TaskColumn from "../components/TaskColumn";
import { FaArrowLeft } from "react-icons/fa6";

export default function Board() {
  const { id } = useParams();
  const { boards } = useBoard();
  const board = boards.find((board) => board.id === Number(id));
  const navigate = useNavigate();

  return (
    <div className="bg-[#1D1F26] min-h-screen">
      <NavBar />

      {/* Go Back Button */}
      <div className="max-w-[1320px] mx-auto mt-5">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white hover:text-gray-400 transition mb-5"
        >
          <FaArrowLeft />
          <span>Go Back</span>
        </button>
      </div>

      <div className="max-w-[1320px] mx-auto grid grid-cols-3 gap-5 mt-5 items-start">
        <TaskColumn
          title="Todos"
          status="todo"
          tasks={board?.tasks || []}
          board={board}
        />
        <TaskColumn
          title="Progress"
          status="progress"
          tasks={board?.tasks || []}
          board={board}
        />
        <TaskColumn
          title="Completed"
          status="completed"
          tasks={board?.tasks || []}
          board={board}
        />
      </div>
    </div>
  );
}
