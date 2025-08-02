import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import useBoard from "../hook/useBoard";
import TaskColumn from "../components/TaskColumn";

export default function Board() {
  const { id } = useParams();
  const { boards } = useBoard();
  const board = boards.find((board) => board.id === Number(id));

  return (
    <div className="bg-[#1D1F26] min-h-screen">
      <NavBar />

      <div className="max-w-[1320px] mx-auto grid grid-cols-3 gap-5 mt-10">
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
