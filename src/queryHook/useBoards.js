import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBoards,
  createBoard,
  deleteBoard,
  addTask,
  updateTaskStatus,
  deleteTask,
} from "../utils/BoardApi";
import useAuth from "../hook/useAuth";
import toast from "react-hot-toast";

// Custom hook for boards and tasks
export default function useBoards() {
  const { user } = useAuth(); 
  const queryClient = useQueryClient();

  // ✅ Fetch boards
  const {
    data: boards = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["boards", user?.email],
    queryFn: () => getBoards(user.email),
    enabled: !!user?.email,
  });

  // ✅ Add a board
  const createBoardMutation = useMutation({
    mutationFn: createBoard,
    onSuccess: () => {
      toast.success("board added");
      queryClient.invalidateQueries(["boards", user?.email]); // refetch boards
    },
    onError: (err) => toast.error(err.message),
  });

  // ✅ Delete a board
  const deleteBoardMutation = useMutation({
    mutationFn: deleteBoard,
    onSuccess: () => {
      toast.success("board Deleted");
      queryClient.invalidateQueries(["boards", user?.email]);
    },
    onError: (err) => toast.error(err.message),
  });

  // ✅ Add a task
  const addTaskMutation = useMutation({
    mutationFn: ({ boardId, taskData }) => addTask(boardId, taskData),
    onSuccess: () => {
      toast.success("Task added");
      queryClient.invalidateQueries(["boards", user?.email]);
    },
    onError: (err) => toast.error(err.message),
  });

  // ✅ Update task status
  const updateTaskMutation = useMutation({
    mutationFn: ({ boardId, taskId, status }) =>
      updateTaskStatus(boardId, taskId, status),
    onSuccess: () => {
      toast.success("updated");
      queryClient.invalidateQueries(["boards", user?.email]);
    },
    onError: (err) => toast.error(err.message),
  });

  // ✅ Delete a task
  const deleteTaskMutation = useMutation({
    mutationFn: ({ boardId, taskId }) => deleteTask(boardId, taskId),
    onSuccess: () => {
      toast.success("task deleted");
      queryClient.invalidateQueries(["boards", user?.email]);
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    boards,
    isLoading,
    error,
    createBoard: createBoardMutation.mutate,
    deleteBoard: deleteBoardMutation.mutate,
    addTask: addTaskMutation.mutate,
    updateTaskStatus: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  };
}
