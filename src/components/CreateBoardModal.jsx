import { useRef, useState, } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 as X } from "react-icons/rx";
import useBoards from "../queryHook/useBoards";
import useAuth from "../hook/useAuth";
import toast from "react-hot-toast";

const COLORS = ["#f97316", "#ef4444", "#eab308", "#14b8a6", "#cbd5e1"];

export default function CreateBoardModal({ onClose }) {
  const modalRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createBoard } = useBoards();
  const { user } = useAuth();

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleColorSelect = (color) => setSelectedColor(color);

  const handleAddNewBoard = (data) => {
    createBoard(
      {
        boardName: data.boardName,
        color: selectedColor,
        userEmail: user.email,
      },
      {
        onSuccess: () => {
          toast.success("Board created successfully!");
          onClose();
        },
        onError: () => {
          toast.error("Failed to create board!");
        },
      }
    );
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
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold">Create Board</h2>
          <button onClick={onClose}>
            <X className="text-white text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleAddNewBoard)}>
          <input
            type="text"
            placeholder="Board name"
            className="w-full p-2 rounded-sm bg-transparent border border-white/50 text-white placeholder:text-white/60 mb-4"
            {...register("boardName", { required: true })}
          />
          {errors.boardName && (
            <p className="text-red-400 text-sm mb-2">Board name is required</p>
          )}

          {/* Color Picker */}
          <div className="mb-4">
            <label className="text-white mr-2">Color:</label>
            <div className="flex items-center gap-3 mt-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleColorSelect(color)}
                  className="w-6 h-6 rounded-full border-2 transition-all duration-200"
                  style={{
                    backgroundColor: color,
                    borderColor: selectedColor === color ? "white" : "transparent",
                    boxShadow: selectedColor === color ? "0 0 0 2px white" : "",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-purple-400 text-black font-semibold rounded-md hover:bg-purple-500"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
