// BoardContext.js
import { createContext, useState } from "react";
import { saveBoards } from "../utils/helper";

export const BoardContext = createContext();

export default function BoardProvider({ children }) {
  const [boards, setBoards] = useState(() => {
    const saved = localStorage.getItem("boards");
    return saved ? JSON.parse(saved) : [];
  });

  const addBoard = (newBoardData) => {
    const newBoard = {
      id: Date.now(),
      ...newBoardData,
      tasks: [],
      createdAt: new Date().toLocaleString(),
    };

    const updated = [...boards, newBoard];
    setBoards(updated);
    saveBoards(updated);
  };

  const deleteBoard = (boardId) => {
    const filteredBoards = boards.filter((board) => board.id !== boardId);
    saveBoards(filteredBoards);
    setBoards(filteredBoards);
  };

  // Add new task to a specific board
  const addTask = (boardId, title, status) => {
    const updatedBoards = boards.map((board) =>
      board.id === boardId
        ? {
            ...board,
            tasks: [...board.tasks, { id: Date.now(), title, status }],
          }
        : board
    );

    setBoards(updatedBoards);
    saveBoards(updatedBoards);
  };

  // Delete a task from a specific board
  const deleteTask = (boardId, taskId) => {
    const updatedBoards = boards.map((board) =>
      board.id === boardId
        ? { ...board, tasks: board.tasks.filter((task) => task.id !== taskId) }
        : board
    );

    setBoards(updatedBoards);
    saveBoards(updatedBoards);
  };

  return (
    <BoardContext.Provider
      value={{ boards, addBoard, deleteBoard, addTask, deleteTask }}
    >
      {children}
    </BoardContext.Provider>
  );
}
