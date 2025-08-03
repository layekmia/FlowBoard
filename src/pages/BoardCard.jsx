import { FaArrowUpRightFromSquare, FaDeleteLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/helper";
import useBoards from "../queryHook/useBoards";

export default function BoardCard({ board }) {
  const navigate = useNavigate();
  const { deleteBoard } = useBoards();

  return (
    <div
      style={{ borderLeft: `4px solid ${board.color}` }}
      className="bg-black text-white flex flex-col p-5"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold capitalize text-base">{board.boardName}</h2>
        <button
          onClick={() => navigate(`/board/${board._id}`)}
          className="text-lg"
          aria-label={`Open board ${board.boardName}`}
        >
          <FaArrowUpRightFromSquare />
        </button>
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold">created at: {formatDate(board.createdAt)}</p>
        <button
          onClick={() => deleteBoard(board._id)}
          className="text-xl text-red-600"
          aria-label={`Delete board ${board.boardName}`}
        >
          <FaDeleteLeft />
        </button>
      </div>
    </div>
  );
}
