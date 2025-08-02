import { useState } from "react";
import NavBar from "../components/NavBar";
import BoardCard from "./BoardCard";
import CreateBoardModal from "../components/CreateBoardModal";

const boards = [
  {
    id: "1",
    title: "Board1",
    createdAt: "2025-08-02T15:30:00",
  },
  {
    id: "2",
    title: "Board2",
    createdAt: "2025-08-02T16:06:57",
  },
  {
    id: "3",
    title: "Board3",
    createdAt: "2025-08-01T10:15:23",
  },
  {
    id: "4",
    title: "Board4",
    createdAt: "2025-07-30T09:45:12",
  },
  {
    id: "5",
    title: "Board5",
    createdAt: "2025-07-28T18:20:40",
  },
];

export default function BoardCategories() {

  return (
    <div className="min-h-screen bg-[#1D1F26]">
      <NavBar />

      <div className="max-w-[1320px] mx-auto grid grid-cols-4 gap-5 mt-10">
        {boards.length !== 0
          ? boards.map((board) => (
              <BoardCard board={board} key={board.id} />
            ))
          : ""}
      </div>
    </div>
   
  );
}
