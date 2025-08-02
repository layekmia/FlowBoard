import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 as X } from "react-icons/rx";
import useBoard from "../hook/useBoard";

const COLORS = ["#f97316", "#ef4444", "#eab308", "#14b8a6", "#cbd5e1"];

export default function CreateBoardModal({ onClose, status }) {
  const modalRef = useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { addTask } = useBoard();

  useEffect(() => {
    setValue("color", COLORS[0]);
  }, [setValue]);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleAddTask = (data) => {
    console.log(data);
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-neutral-800 p-6 rounded-md w-[380px] relative"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold">Add Task</h2>
          <button onClick={onClose}>
            <X className="text-white text-xl" />
          </button>
        </div>
        <p>status: {status}</p>
        <form onSubmit={handleSubmit(handleAddTask)}>
          <input
            type="text"
            placeholder="Board name"
            className="w-full p-2 rounded-sm bg-transparent border border-white/50 text-white placeholder:text-white/60 mb-4"
            {...register("boardName", { required: true })}
          />
          {errors.boardName && (
            <p className="text-red-400 text-sm mb-2">Board name is required</p>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-purple-400 text-black font-semibold rounded-md hover:bg-purple-500"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
