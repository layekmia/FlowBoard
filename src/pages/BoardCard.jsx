import { FaArrowUpRightFromSquare, FaDeleteLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function BoardCard({ board }) {
  const navigate = useNavigate();

  return (
    <div
      key={board.id}
      className="bg-black text-white flex flex-col p-5 border-l-4 border-yellow-500 "
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold capitalize text-base">{board.title}</h2>
        <button
          onClick={() => navigate(`/board/${board.id}`)}
          className="text-lg"
        >
          <FaArrowUpRightFromSquare />
        </button>
      </div>
      <div className="flex items-center justify-between gap-3 mt-2">
        <p className="text-sm font-bold">created At: {board.createdAt}</p>
        <button className="text-xl text-red-600"><FaDeleteLeft /></button>
      </div>
    </div>
  );
}
