import NavBar from "../components/NavBar";
import BoardCard from "./BoardCard";
// import useBoard from "../hook/useBoard";

export default function BoardCategories() {
  // const { boards } = useBoard();
  

  return (
    <div className="min-h-screen bg-[#1D1F26]">
      <NavBar />

      <div className="max-w-[1320px] mx-auto grid grid-cols-4 gap-5 mt-10">
        {boards.length !== 0
          ? boards.map((board) => <BoardCard board={board} key={board.id} />)
          : ""}
      </div>
    </div>
  );
}
