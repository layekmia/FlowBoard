import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { FaDeleteLeft, FaPlus } from "react-icons/fa6";

export default function Board() {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="bg-[#1D1F26] min-h-screen">
      <NavBar />

      <div className="max-w-[1320px] mx-auto grid grid-cols-3 gap-5 mt-10">
        <div className="p-5 bg-black text-white">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold">Todos</h2>
            <button className="text-xl">
              <FaPlus />
            </button>
          </div>
          <div className="flex items-center flex-col gap-3 px-3">
            <button className="w-full text-left grid grid-cols-[1fr_auto] items-center gap-3">
              <p className="bg-gray-600 py-2 px-3">Coding</p>
              <button className="text-xl">
                <FaDeleteLeft />
              </button>
            </button>
            <button className="w-full text-left grid grid-cols-[1fr_auto] items-center gap-3">
              <p className="bg-gray-600 py-2 px-3">Coding</p>
              <button className="text-xl">
                <FaDeleteLeft />
              </button>
            </button>
          </div>
        </div>
        <div className="p-5 bg-black text-white">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold">Progress</h2>
            <button className="text-xl">
              <FaPlus />
            </button>
          </div>
          <div className="flex items-center flex-col gap-3 px-3">
            <button className="w-full text-left grid grid-cols-[1fr_auto] items-center gap-3">
              <p className="bg-gray-600 py-2 px-3">Coding</p>
              <button className="text-xl">
                <FaDeleteLeft />
              </button>
            </button>
            <button className="w-full text-left grid grid-cols-[1fr_auto] items-center gap-3">
              <p className="bg-gray-600 py-2 px-3">Coding</p>
              <button className="text-xl">
                <FaDeleteLeft />
              </button>
            </button>
          </div>
        </div>
        <div className="p-5 bg-black text-white">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold">Completed</h2>
            <button className="text-xl">
              <FaPlus />
            </button>
          </div>
          <div className="flex items-center flex-col gap-3 px-3">
            <button className="w-full text-left grid grid-cols-[1fr_auto] items-center gap-3">
              <p className="bg-gray-600 py-2 px-3">Coding</p>
              <button className="text-xl">
                <FaDeleteLeft />
              </button>
            </button>
            <button className="w-full text-left grid grid-cols-[1fr_auto] items-center gap-3">
              <p className="bg-gray-600 py-2 px-3">Coding</p>
              <button className="text-xl">
                <FaDeleteLeft />
              </button>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
