import { useState } from "react";
import { RxCross2 as X } from "react-icons/rx";

const COLORS = ["#f97316", "#ef4444", "#eab308", "#14b8a6", "#cbd5e1"];

export default function CreateBoardModal({ onClose }) {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [boardName, setBoardName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ boardName, selectedColor });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-neutral-800 p-6 rounded-md w-[380px] relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold">Create Board</h2>
          <button onClick={onClose}>
            <X className="text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Board name"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            className="w-full p-2 rounded-sm bg-transparent border border-white/50 text-white placeholder:text-white/60 mb-4"
            required
          />

          <div className="mb-4">
            <label className="text-white mr-2">Color:</label>
            <div className="flex items-center gap-3 mt-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-200`}
                  style={{
                    backgroundColor: color,
                    borderColor:
                      selectedColor === color ? "white" : "transparent",
                    boxShadow: selectedColor === color ? "0 0 0 2px white" : "",
                  }}
                />
              ))}
              <div className="w-6 h-6 rounded-full bg-gray-300"></div>
            </div>
          </div>

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
