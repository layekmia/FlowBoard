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

export default function useBoards() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch boards
  const {
    data: boards = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["boards", user?.email],
    queryFn: () => getBoards(user.email),
    enabled: !!user?.email,
  });

  // Add a board
  const createBoardMutation = useMutation({
    mutationFn: createBoard,
    onSuccess: () => {
      toast.success("Board added");
      queryClient.invalidateQueries(["boards", user?.email]);
    },
    onError: (err) => toast.error(err.message),
  });

  // Delete a board
  const deleteBoardMutation = useMutation({
    mutationFn: deleteBoard,
    onSuccess: () => {
      toast.success("Board deleted");
      queryClient.invalidateQueries(["boards", user?.email]);
    },
    onError: (err) => toast.error(err.message),
  });

  // Add a task
  const addTaskMutation = useMutation({
    mutationFn: ({ boardId, taskData }) => addTask(boardId, taskData),
    onSuccess: () => {
      toast.success("Task added");
      queryClient.invalidateQueries(["boards", user?.email]);
    },
    onError: (err) => toast.error(err.message),
  });

  // Update task status with optimistic UI update
  const updateTaskMutation = useMutation({
    mutationFn: ({ boardId, taskId, status }) =>
      updateTaskStatus(boardId, taskId, status),

    onMutate: async ({ boardId, taskId, status }) => {
      await queryClient.cancelQueries(["boards", user?.email]);

      const previousBoards = queryClient.getQueryData(["boards", user?.email]);

      queryClient.setQueryData(["boards", user?.email], (oldBoards) => {
        return oldBoards.map((board) =>
          board._id === boardId
            ? {
                ...board,
                tasks: board.tasks.map((task) =>
                  task._id === taskId ? { ...task, status } : task
                ),
              }
            : board
        );
      });

      return { previousBoards };
    },

    onError: (err, _, context) => {
      toast.error("Failed to update task status");
      if (context?.previousBoards) {
        queryClient.setQueryData(
          ["boards", user?.email],
          context.previousBoards
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(["boards", user?.email]);
    },
  });

  // Delete task with optimistic UI update
  const deleteTaskMutation = useMutation({
    mutationFn: ({ boardId, taskId }) => deleteTask(boardId, taskId),

    onMutate: async ({ boardId, taskId }) => {
      await queryClient.cancelQueries(["boards", user?.email]);
      const previousBoards = queryClient.getQueryData(["boards", user?.email]);

      queryClient.setQueryData(["boards", user?.email], (oldBoards) => {
        return oldBoards.map((board) =>
          board._id === boardId
            ? {
                ...board,
                tasks: board.tasks.filter((task) => task._id !== taskId),
              }
            : board
        );
      });

      return { previousBoards };
    },

    onSuccess: () => {
      toast.success("Task Deleted");
    },

    onError: (err, _, context) => {
      toast.error("Failed to delete task");
      if (context?.previousBoards) {
        queryClient.setQueryData(
          ["boards", user?.email],
          context.previousBoards
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(["boards", user?.email]);
    },
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
