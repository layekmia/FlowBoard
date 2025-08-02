// get all boards
export const getBoards = () => {
  return JSON.parse(localStorage.getItem("boards")) || [];
};

// save Boards
export const saveBoards = (boards) => {
  localStorage.setItem("boards", JSON.stringify(boards));
};

// Add new board
const addBoard = (newBoard) => {
  const boards = getBoards();
  boards.push({ ...newBoard, tasks: [] });
  saveBoards(boards);
};

// Delete a board by ID
const deleteBoard = (boardId) => {
  const boards = getBoards().filter((board) => board.id !== boardId);
  saveBoards(boards);
};

// Add task to specific board
const addTaskToBoard = (boardId, task) => {
  const boards = getBoards();
  const boardIndex = boards.findIndex((b) => b.id === boardId);
  if (boardIndex !== -1) {
    boards[boardIndex].tasks.push(task);
    saveBoards(boards);
  }
};

// Delete task from board by taskId
const deleteTaskFromBoard = (boardId, taskId) => {
  const boards = getBoards();
  const boardIndex = boards.findIndex((b) => b.id === boardId);
  if (boardIndex !== -1) {
    boards[boardIndex].tasks = boards[boardIndex].tasks.filter(
      (task) => task.id !== taskId
    );
    saveBoards(boards);
  }
};

const updateTaskStatus = (boardId, taskId, newStatus) => {
  const boards = getBoards();
  const boardIndex = boards.findIndex((b) => b.id === boardId);
  if (boardIndex !== -1) {
    const taskIndex = boards[boardIndex].tasks.findIndex(
      (t) => t.id === taskId
    );
    if (taskIndex !== -1) {
      boards[boardIndex].tasks[taskIndex].status = newStatus;
      saveBoards(boards);
    }
  }
};
