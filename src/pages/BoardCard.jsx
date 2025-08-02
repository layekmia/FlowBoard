import { FaArrowUpRightFromSquare, FaDeleteLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useBoard from "../hook/useBoard";

export default function BoardCard({ board }) {
  const navigate = useNavigate();
  const {deleteBoard} = useBoard();

  return (
    <div
      key={board.id}
      style={{ borderLeft: `4px solid ${board.color}` }}
      className={`bg-black text-white flex flex-col p-5`}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold capitalize text-base">
          {board.boardName}
        </h2>
        <button
          onClick={() => navigate(`/board/${board.id}`)}
          className="text-lg"
        >
          <FaArrowUpRightFromSquare />
        </button>
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold">created at: {board.createdAt}</p>
        <button onClick={() => deleteBoard(board.id)} className="text-xl text-red-600">
          <FaDeleteLeft />
        </button>
      </div>
    </div>
  );
}
