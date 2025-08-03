import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getBoards = async (email) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/boards`, {
      params: { email },
    });
    return data;
  } catch (error) {
    console.error("Error fetching boards:", error);
    throw error;
  }
};


export const getBoardById = async (boardId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/boards/${boardId}`);
    return data;
  } catch (error) {
    console.error("Error fetching board by ID:", error);
    throw error;
  }
};

export const createBoard = async (boardData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/board`, boardData);
    return data;
  } catch (error) {
    console.error("Error adding board:", error);
    throw error;
  }
};

export const deleteBoard = async (boardId) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}/boards/${boardId}`);
    return data;
  } catch (error) {
    console.error("Error deleting board:", error);
    throw error;
  }
};

export const addTask = async (boardId, taskData) => {
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/boards/add-task/${boardId}`,
      taskData
    );
    return data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const updateTaskStatus = async (boardId, taskId, status) => {
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/boards/${boardId}/tasks/${taskId}/status`,
      { status }
    );
    return data;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

export const deleteTask = async (boardId, taskId) => {
  try {
    const { data } = await axios.delete(
      `${BASE_URL}/boards/${boardId}/tasks/${taskId}`
    );
    return data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
