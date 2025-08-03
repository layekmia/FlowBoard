import NavBar from "../components/NavBar";
import useBoards from "../queryHook/useBoards";
import BoardCard from "./BoardCard";

export default function BoardCategories() {
  const { boards } = useBoards();

  return (
    <div className="min-h-screen bg-[#1D1F26]">
      <NavBar />

      <div className="max-w-[1320px] mx-auto grid grid-cols-4 gap-5 mt-10">
        {boards.length !== 0
          ? boards.map((board) => <BoardCard board={board} key={board._id} />)
          : ""}
      </div>
    </div>
  );
}
