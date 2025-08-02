// BoardContext.js
import { createContext, useState } from "react";

export const BoardContext = createContext();

export default function BoardProvider({ children }) {
  const [boards, setBoards] = useState(() => {
    const saved = localStorage.getItem("boards");
    return saved ? JSON.parse(saved) : [];
  });

  const addBoard = (newBoardData) => {
    console.log(newBoardData);
    const newBoard = {
      id: Date.now(),
      ...newBoardData,
      createdAt: new Date().toLocaleString(),
    };

    const updated = [...boards, newBoard];
    setBoards(updated);
    localStorage.setItem("boards", JSON.stringify(updated));
  };

  return (
    <BoardContext.Provider value={{ boards, addBoard }}>
      {children}
    </BoardContext.Provider>
  );
}
